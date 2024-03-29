import { ReactNode } from 'react';
import { IExtendedUser } from './next-auth';
import { Role } from '@prisma/client';

export interface IParentProps {
    children: ReactNode;
};

export interface ILoginButtonProps extends IParentProps {
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
};

export interface ICardWrapperProps extends IParentProps {
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export interface IHeaderProps {
    label: string;
};

export interface IBackButtonProps {
    label: string;
    href: string;
};

export interface IFormResponse {
    message?: string;
    type: 'error' | 'success';
}

export interface IFormResponseProps {
    response: IFormResponse;
}

export interface IUserInfoProps {
    user?: IExtendedUser | null; //TODO: fix this type error
    label: string;
}

export interface IUserInfoItemProps {
    label: string;
    value: string;
}

export interface IRoleGateProps extends IParentProps {
    allowedRole: Role;
};
