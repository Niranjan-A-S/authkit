
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { comparePasswords } from './utils/hash';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const isPasswordCorrect = await comparePasswords(password, user.password);
                    if (isPasswordCorrect) return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig;
