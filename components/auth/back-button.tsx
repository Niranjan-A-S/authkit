'use client';

import { Button } from '@/components/ui/button';
import { IBackButtonProps } from '@/types/component-props';
import Link from 'next/link';
import { FC, memo } from 'react';

export const BackButton: FC<IBackButtonProps> = memo(({ href, label }) => (
    <Button
        variant="link"
        className="font-normal w-full"
        size="sm"
        asChild
    >
        <Link href={href}>
            {label}
        </Link>
    </Button>
));
