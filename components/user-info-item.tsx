'use client';

import { IUserInfoItemProps } from '@/types/component-props';
import React, { FC, memo } from 'react';

export const UserInfoItem: FC<IUserInfoItemProps> = memo(({ label, value }) => (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">
            {label}
        </p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {value}
        </p>
    </div>
));
