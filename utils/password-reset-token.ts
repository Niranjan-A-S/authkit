import { db } from '@/lib/db';
import { v4 as uuidV4 } from 'uuid';

export const getPasswordResetTokenFromToken = async (token: string) => {
    try {
        return await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenFromEmail = async (email: string) => {
    try {
        return await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });
    } catch (error) {
        return null;
    }
};
export const deletePasswordResetToken = async (tokenId: string) =>
    await db.passwordResetToken.delete({
        where: {
            id: tokenId
        }
    });

const addPasswordResetTokenToDB = async (token: string, email: string) => {
    const expires = new Date(new Date().getTime() + (1000 * 3600));

    return await db.passwordResetToken.create({
        data: {
            email,
            expires,
            token
        }
    });
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidV4();

    const existingToken = await getPasswordResetTokenFromEmail(email);
    if (existingToken) await deletePasswordResetToken(existingToken.id);

    return await addPasswordResetTokenToDB(token, email);
};
