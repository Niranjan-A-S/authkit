'use server';

import { RegisterSchema } from '@/schemas';
import z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const register = async (value: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid fields'
    };

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    });
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
