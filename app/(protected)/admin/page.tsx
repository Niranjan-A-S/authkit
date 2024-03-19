'use client';

import { adminAction } from '@/actions/admin';
import { FormResponse } from '@/components/form-response';
import { RoleGate } from '@/components/role-gate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-user';
import { Role } from '@prisma/client';
import { useCallback } from 'react';
import { toast } from 'sonner';

const AdminPage = () => {
    const user = useCurrentUser();

    const onAdminAPIClick = useCallback(async () => {
        const response = await fetch('/api/admin');
        if (response.ok) {
            toast.success('Allowed API Route!');
        }
        else {
            toast.error('Forbidden API Route!');
        }
    }, []);

    const onAdminActionClick = useCallback(async () => {
        const data = await adminAction();
        if (data?.success) {
            toast.success(data?.success);
        }
        else {
            toast.error(data?.error);
        }
    }, []);

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={Role.ADMIN}>
                    <FormResponse response={{ type: 'success', message: 'You are allowed to see this content.' }} />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin only API route
                    </p>
                    <Button onClick={onAdminAPIClick}>Click to test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin only Sever Action
                    </p>
                    <Button onClick={onAdminActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;

