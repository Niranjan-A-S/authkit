'use client';

import { newPassword } from '@/actions/new-password';
import { resetPassword } from '@/actions/reset-password';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormResponse } from '@/components/form-response';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Placeholder, defaultResponse } from '@/constants';
import { NewPasswordSchema } from '@/schemas';
import { IFormResponse } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const NewPasswordForm: FC = memo(() => {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<IFormResponse>(defaultResponse);

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        }
    });

    const renderPasswordField = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    type="password"
                    placeholder={Placeholder.Password}
                    disabled={isPending}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ), [isPending]);

    const onSubmit = useCallback((values: z.infer<typeof NewPasswordSchema>) => {
        setResponse(defaultResponse);
        startTransition(async () => {
            try {
                const { error, success } = await newPassword(values, token);
                setResponse(error
                    ? { type: 'error', message: error }
                    : { type: 'success', message: success }
                );
            } catch (error: any) {
                setResponse({ type: 'error', message: 'Something went wrong' });
            } finally {
                form.reset();
            }
        });
    }, [form, token]);

    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={renderPasswordField}
                        />
                    </div>
                    <FormResponse response={response} />
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
});
