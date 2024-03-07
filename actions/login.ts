'use server';

import { LoginSchema } from '@/schemas';
import z from 'zod';

export const loginAction = async (value: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid email or password'
    };
    return { success: 'Email sent!' };
};
