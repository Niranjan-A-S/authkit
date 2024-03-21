'use server';

import { ResetPasswordSchema } from '@/schemas';
import { sendPasswordResetMail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/password-reset-token';
import { getUserByEmail } from '@/lib/user';
import z from 'zod';

export const resetPassword = async (value: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid email'
    };

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) return {
        error: 'User with specified email does not exist'
    };

    const passwordResetToken = await generatePasswordResetToken(email);
    const { error } = await sendPasswordResetMail(
        passwordResetToken.email,
        passwordResetToken.token
    );
    if (error) return {
        error: 'Failed to send password reset link'
    };

    return { success: 'Reset password link sent' };
};
