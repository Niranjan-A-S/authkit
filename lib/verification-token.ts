import { db } from '@/lib/db';
import { v4 as uuidV4 } from 'uuid';

export const getVerificationTokenFromEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email
            }
        });
    } catch (err) {
        return null;
    }
};
export const getVerificationTokenFromToken = async (token: string) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token
            }
        });
    } catch (err) {
        return null;
    }
};

export const removeVerificationToken = async (tokenId: string) => {
    await db.verificationToken.delete({
        where: {
            id: tokenId
        }
    });
};

const addVerificationTokenToDB = async (email: string, token: string) => {
    try {
        const expires = new Date(new Date().getTime() + (1000 * 3600));
        return await db.verificationToken.create({
            data: {
                email,
                expires,
                token
            }
        });
    } catch (error) {
        return null;
    }
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();

    const existingToken = await getVerificationTokenFromEmail(email);
    if (existingToken) await removeVerificationToken(existingToken.id);

    return await addVerificationTokenToDB(email, token);
};

