'use client';

import { useCurrentUser } from '@/hooks/use-user';
import { IRoleGateProps } from '@/types/component-props';
import { FC, memo } from 'react';
import { FormResponse } from './form-response';

export const RoleGate: FC<IRoleGateProps> = memo(({ allowedRole, children }) => {
    const role = useCurrentUser()?.role;

    if (role !== allowedRole) {
        return <FormResponse response={{ type: 'error', message: 'You do not have permission to view this content!' }} />;
    }

    return <>{children}</>;
});
