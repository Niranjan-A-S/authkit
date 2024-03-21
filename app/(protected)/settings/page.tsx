'use client';

import { updateSettings } from '@/actions/settings';
import { FormResponse } from '@/components/form-response';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Placeholder } from '@/constants';
import { useCurrentUser } from '@/hooks/use-user';
import { SettingsSchema } from '@/schemas';
import { IFormResponse } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const SettingsPage = () => {

    const [response, setResponse] = useState<IFormResponse>({
        type: 'success',
        message: ''
    }); // TODO:  move this default value to separate constant
    const [isLoading, startTransition] = useTransition();
    const { update } = useSession();
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined
        }
    });


    const onSubmit = useCallback((values: z.infer<typeof SettingsSchema>) => {
        startTransition(
            async () => {
                try {
                    const { error, success } = await updateSettings(values);
                    if (error) {
                        setResponse({ type: 'error', message: error });
                    } if (success) {
                        update();
                        setResponse({ type: 'success', message: success });
                    }
                } catch (error) {
                    setResponse({ type: 'error', message: 'Something went wrong' });
                }
            });
    }, [update]);


    const renderInputField = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    disabled={isLoading}
                    placeholder={Placeholder.Name}
                />
            </FormControl>
        </FormItem>
    ), [isLoading]);

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🧇 Settings
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={renderInputField}
                            />
                        </div>
                        <FormResponse response={response} />
                        <Button type="submit" disabled={isLoading}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
