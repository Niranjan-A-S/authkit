'use server';

import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getCurrentUser } from '@/lib/auth';
import { getUserById } from '@/lib/user';
import z from 'zod';

export const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
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
