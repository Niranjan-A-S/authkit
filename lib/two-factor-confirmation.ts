import { db } from '@/lib/db';

export const getTwoFactorConfirmationFromUserId = async (userId: string) => {
    try {
        return await db.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        });
    } catch (error) {
        return null;
    }
};
