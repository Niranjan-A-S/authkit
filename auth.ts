import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { getUserById } from './utils/user';

export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    pages: {
        error: '/auth/error'
        //TODO this is not working
    },
    callbacks: {
        async signIn({ user }) {
            const existingUser = user.id && await getUserById(user.id);
            if (!existingUser || !existingUser.emailVerified) {
                //TODO: change this to false
                return true;
            }
            return true;
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
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            });
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
});
