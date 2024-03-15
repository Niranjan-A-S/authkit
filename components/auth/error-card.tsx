'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { FC, memo } from 'react';
import { CardWrapper } from './card-wrapper';

export const ErrorCard: FC = memo(() => (
    <CardWrapper
        headerLabel="Oops! Something went wrong"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <div className="flex w-full justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive h-full w-10" />
        </div>
    </CardWrapper>
));
