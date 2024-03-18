import { db } from '@/lib/db';
import crypto from 'crypto';

export const getTwoFactorTokenFromEmail = async (email: string) => {
    try {
        return await db.twoFactorToken.findFirst({
            where: {
                email
            }
        });
    } catch (error) {
        return null;
    }
};

export const getTwoFactorTokenFromToken = async (token: string) => {
    try {
        return await db.twoFactorToken.findUnique({
            where: {
                token
            }
        });
    } catch (error) {
        return null;
    }
};

export const deleteTwoFactorToken = async (tokenId: string) => {
    await db.twoFactorToken.delete({
        where: {
            id: tokenId
        }
    });
};

export const addTwoFactorTokenToDB = async (email: string, token: string) => {
    const expires = new Date(new Date().getTime() + (1000 * 3600));

    return await db.twoFactorToken.create({
        data: {
            email,
            expires,
            token
        }
    });
};


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();

    const existingToken = await getTwoFactorTokenFromToken(token);
    if (existingToken) deleteTwoFactorToken(existingToken.id);

    return await addTwoFactorTokenToDB(email, token);
};
