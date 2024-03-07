import { ReactNode } from 'react';

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

