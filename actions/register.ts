'use server';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { generateHashedPassword } from '@/lib/hash';
import { sendVerificationEmail } from '@/lib/mail';
import { getUserByEmail } from '@/lib/user';
import { generateVerificationToken } from '@/lib/verification-token';
import z from 'zod';

export const register = async (value: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid fields'
    };

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await generateHashedPassword(password);

    const existingUser = await getUserByEmail(email);
    if (existingUser) return {
        error: 'Email already in use'
    };

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    const { error } = await sendVerificationEmail(verificationToken?.email!, verificationToken?.token!);//TODO: fix this types
    if (error) return { error: 'Failed to send verification email.' };

    return { success: 'Confirmation email sent.' };
};
