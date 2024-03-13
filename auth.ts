import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { getUserById } from './utils/user';

export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    callbacks: {
        async signIn({ user }) {
            const existingUser = user.id && await getUserById(user.id);
            return !existingUser || !existingUser.id;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user && token.role) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
});
