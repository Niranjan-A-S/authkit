import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { getAccountByUserId } from './lib/account';
import { getTwoFactorConfirmationFromUserId } from './lib/two-factor-confirmation';
import { getUserById } from './lib/user';

export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    pages: {
        error: '/auth/error'
        //TODO this is not working
    },
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id!); //todo fix this type
            //Prevent sign in if email is not verified
            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationFromUserId(existingUser.id);
                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                });
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user && token.role) {
                session.user.role = token.role as any;
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as any;
                session.user.name = token.name as any;
                session.user.email = token.email as any;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.email = existingUser.email;
            token.name = existingUser.name;

            const existingAccount = await getAccountByUserId(existingUser.id);
            token.isOAuth = !!existingAccount;

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
