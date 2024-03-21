import { Role, User as PrismaUser } from '@prisma/client';
import { User } from 'next-auth';
interface IExtendedUser extends PrismaUser extends User {
    isOAuth: boolean;
}

declare module 'next-auth' {
    interface Session {
        user: IExtendedUser
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: Role,
        isTwoFactorEnabled: boolean;
    }
}
