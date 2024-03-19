'use server';

import { db } from '@/lib/db';
import { SettingSchema } from '@/schemas';
import { getCurrentUser } from '@/utils/auth';
import { getUserById } from '@/utils/user';
import z from 'zod';

export const updateSettings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await getCurrentUser();
    if (!user) return {
        error: 'Unauthorized'
    };

    const dbUser = await getUserById(user.id);
    if (!dbUser) return {
        error: 'Unauthorized'
    };

    await db.user.update({
        where: {
            id: dbUser.id
        }, data: {
            ...values
        }
    });

    return { success: 'Settings Updated!' };
};
