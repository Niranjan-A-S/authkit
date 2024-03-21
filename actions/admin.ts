'use server';

import { getCurrentUser } from '@/lib/auth';
import { Role } from '@prisma/client';

export const adminAction = async () => {
    const role = (await getCurrentUser())?.role;

    if (role === Role.ADMIN) return { success: 'Allowed Admin Action!' };
    return { error: 'Forbidden Admin Action!' };
};
