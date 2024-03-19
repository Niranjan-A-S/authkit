import { Role } from '@prisma/client';
import { User } from 'next-auth';
interface IExtendedUser extends User {
    role: Role;
}

declare module 'next-auth' {
    interface Session {
        user: IExtendedUser
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: Role
    }
}
