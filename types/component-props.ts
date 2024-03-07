import { ReactNode } from 'react';

export interface IParentProps {
    children: ReactNode;
};

export interface ILoginButtonProps extends IParentProps {
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
};
