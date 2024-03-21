'use server';

import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import { generateHashedPassword } from '@/lib/hash';
import { deletePasswordResetToken, getPasswordResetTokenFromToken } from '@/lib/password-reset-token';
import { getUserByEmail } from '@/lib/user';
import z from 'zod';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) return { error: 'Password reset token is missing!' };

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) return {
        error: 'Password does not meet the required constraints!'
    };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenFromToken(token);
    if (!existingToken) return {
        error: 'Invalid password reset token!'
    };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return {
        error: 'Password reset token has expired!'
    };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return {
        error: 'Email not found for the given token!'
    };

    const hashedPassword = await generateHashedPassword(password);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    });

    await deletePasswordResetToken(existingToken.id);

    return { success: 'Password updated!' };
};
