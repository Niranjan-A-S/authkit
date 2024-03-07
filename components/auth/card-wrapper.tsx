'use client';

import { BackButton } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ICardWrapperProps } from '@/types/component-props';
import { FC, memo } from 'react';

export const CardWrapper: FC<ICardWrapperProps> = memo(({ children, headerLabel, backButtonHref, backButtonLabel, showSocial }) => (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            {showSocial && (
                <Social />
            )}
        </CardFooter>
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        </CardFooter>
    </Card>
));
