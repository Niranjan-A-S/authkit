'use client';

import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import { buttonItems } from '@/constants';
import { IButton } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, memo, useCallback } from 'react';

export const Navbar: FC = memo(() => {
    const pathname = usePathname();

    const renderButton = useCallback(({ href, label }: IButton) => (
        <Button
            key={label}
            asChild
            variant={pathname === href ? 'default' : 'outline'}
        >
            <Link href={href}>{label}</Link>
        </Button>
    ), [pathname]);

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                {buttonItems.map(renderButton)}
            </div>
            <UserButton />
        </nav >
    );
});

