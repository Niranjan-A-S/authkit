'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenFromToken, removeVerificationToken } from '@/utils/verification-token';

export const verifyEmail = async (token: string) => {
    const existingToken = await getVerificationTokenFromToken(token);
    if (!existingToken) return { error: 'Token does not exist!' };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: 'Token has expired. Please use another verification link' };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: 'Email does not exist' };

    await db.user.update({
        where: {
            id: existingUser.id
        }, data: {
            email: existingToken.email,
            emailVerified: new Date()
        }
    });

    await removeVerificationToken(existingToken.id);

    return { success: 'Email Verified' };
};
