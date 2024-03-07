'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { FC, memo } from 'react';

export const LoginForm: FC = memo(() => (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <div>Login Form</div>
    </CardWrapper>
));
