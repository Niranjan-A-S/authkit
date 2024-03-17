import { Role } from '@prisma/client';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            role: Role
            id: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: Role
    }
}
