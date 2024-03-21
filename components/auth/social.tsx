'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useMemo } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const Social: FC = memo(() => {

    const searchParams = useSearchParams();
    const callbackUrl = useMemo(() => searchParams.get('callbackUrl'), [searchParams]);

    const onClick = useCallback((provider: 'google' | 'github') => {
        signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    }, [callbackUrl]);

    return (
    <div className="flex items-center w-full gap-x-2">
        <Button
            size="lg"
            className="w-full"
            variant="outline"
                onClick={() => onClick('google')}
        >
            <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
            size="lg"
            className="w-full"
            variant="outline"
                onClick={() => onClick('github')}
        >
            <FaGithub className="h-5 w-5" />
        </Button>
    </div>
    );
});
