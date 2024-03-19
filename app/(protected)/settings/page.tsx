'use client';

import { updateSettings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

const SettingsPage = () => {

    const [isLoading, startTransition] = useTransition();
    const { update } = useSession();

    const onUpdateName = useCallback(() => {
        startTransition(
            async () => {
                const { error, success } = await updateSettings({
                    name: 'Niranjan'
                });
                update();
                success ? toast.success(success) : toast.error(error);
            });
    }, [update]);

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🧇 Settings
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={onUpdateName} disabled={isLoading}>Update name</Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
