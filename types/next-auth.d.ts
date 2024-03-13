import { ROLE } from '@prisma/client';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {

    interface Session {
        user: {
            role: ROLE
            id: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: ROLE
    }
}
