'use client';

import { IFormResponseProps } from '@/types/component-props';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { FC, memo, useMemo } from 'react';

export const FormResponse: FC<IFormResponseProps> = memo(({ message, type }) => {

    const Icon = useMemo(() => (
        type === 'success'
            ? CheckCircledIcon
            : ExclamationTriangleIcon
    ), [type]);

    return (
        message
            ? (
                <div
                    className={type === 'success'
                        ? 'bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500' :
                        'bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'
                    }>
                    <Icon className="h-4 w-4" />
                    <p>{message}</p>
                </div>
            )
            : null
    );
});
