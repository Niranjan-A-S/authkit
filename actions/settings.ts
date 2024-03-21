'use server';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { comparePasswords, generateHashedPassword } from '@/lib/hash';
import { sendVerificationEmail } from '@/lib/mail';
import { getUserById } from '@/lib/user';
import { generateVerificationToken } from '@/lib/verification-token';
import { SettingsSchema } from '@/schemas';
import z from 'zod';

export const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await getCurrentUser();
    if (!user) return {
        error: 'Unauthorized'
    };

    const dbUser = await getUserById(user.id);
    if (!dbUser) return {
        error: 'Unauthorized'
    };

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await db.user.findUnique({
            where: {
                email: values.email
            }
        });
        if (existingUser) return {
            error: 'Email already in use!'
        };

        const verificationToken = await generateVerificationToken(values.email);
        const { error } = await sendVerificationEmail(verificationToken?.email!, verificationToken?.token!);
        if (error) return { error: 'Failed to send verification email.' };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await comparePasswords(values.password, dbUser.password);
        if (!passwordsMatch) return {
            error: 'Incorrect password!'
        };

        const hashedPassword = await generateHashedPassword(values.newPassword);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const { email, name, isTwoFactorEnabled, role } = await db.user.update({
        where: {
            id: dbUser.id
        }, data: {
            ...values
        }
    });

    //TODO: use this when it is stable
    // unstable_update({
    //     user: {
    //         name,
    //         email,
    //         isTwoFactorEnabled,
    //         role
    //     }
    // });

    return { success: 'Settings Updated!' };
};
