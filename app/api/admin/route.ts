import { getCurrentUser } from '@/lib/auth';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const role = (await getCurrentUser())?.role;

    if (role === Role.ADMIN) return new NextResponse(null, { status: 200 });

    return new NextResponse(null, { status: 403 });
};

