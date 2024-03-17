'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import { generateVerificationToken } from '@/utils/verification-token';
import { AuthError } from 'next-auth';
import z from 'zod';

export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid email or password'
    };
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) return { error: 'Email does  not exist!' };

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        return { success: 'Confirmation email sent' };
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' };
                case 'AccessDenied':
                    return { error: 'Access Denied' };
                default:
                    return { error: 'Something went wrong' };
            }
        }
        //TODO what is the issue??
        throw error;
    }
    return { success: 'Confirmation email sent!' };
};
