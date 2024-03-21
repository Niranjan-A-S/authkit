/* eslint-disable complexity */
'use server';

import { signIn } from '@/auth';
import { db } from '@/lib/db';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { sendTwoFactorToken, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorConfirmationFromUserId } from '@/lib/two-factor-confirmation';
import { generateTwoFactorToken, getTwoFactorTokenFromEmail } from '@/lib/two-factor-token';
import { getUserByEmail } from '@/lib/user';
import { generateVerificationToken } from '@/lib/verification-token';
import { AuthError } from 'next-auth';
import z from 'zod';

export const login = async (value: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid email or password'
    };
    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) return { error: 'User with given email does  not exist!' };

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        const { error } = await sendVerificationEmail(verificationToken?.email!, verificationToken?.token!);//TODO: fix this types
        if (error) return { error: 'Failed to send verification email.' };

        return { success: 'Confirmation email sent.' };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenFromEmail(email);
            if (!twoFactorToken) return {
                error: 'Invalid 2FA code'
            };

            if (twoFactorToken.token !== code) return {
                error: 'The 2FA code you have entered is wrong!'
            };

            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) return {
                error: 'The 2FA code has expired!'
            };

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationFromUserId(existingUser.id);

            if (existingConfirmation) await db.twoFactorConfirmation.delete({
                where: {
                    id: existingConfirmation.id
                }
            });

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });
        }
        else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            const { error } = await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);
            if (error) return { error: 'Failed to send 2FA code' };

            return { twoFactor: 'Two Factor Authentication code sent!' };
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };
                case 'AccessDenied':
                    return { error: 'Access Denied!' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }
        //TODO what is the issue??
        throw error;
    }
    return { success: 'Confirmation email sent!' };
};
