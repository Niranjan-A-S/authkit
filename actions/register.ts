'use server';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getHashedPassword } from '@/utils/hash';
import { getUserByEmail } from '@/utils/user';
import z from 'zod';

export const register = async (value: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid fields'
    };

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await getHashedPassword(password);

    const existingUser = await getUserByEmail(email);
    if (existingUser) return {
        error: 'Email already in use'
    };

    const user = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    // TODO:  send verification token email

    return { success: 'User created!' };
};
