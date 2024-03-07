'use client';

import { FC, memo } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

export const Social: FC = memo(() => (
    <div className="flex items-center w-full gap-x-2">
        <Button
            size="lg"
            className="w-full"
            variant="outline"
        >
            <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
            size="lg"
            className="w-full"
            variant="outline"
        >
            <FaGithub className="h-5 w-5" />
        </Button>
    </div>
));