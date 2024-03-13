'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import z from 'zod';

export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) return {
        error: 'Invalid email or password'
    };
    const { email, password } = validatedFields.data;
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
                    return { error: 'Verify your email!' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }
        //TODO what is the issue??
        throw error;
    }
    return { success: 'Email sent!' };
};
