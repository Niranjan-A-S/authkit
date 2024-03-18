'use client';

import { resetPassword } from '@/actions/reset-password';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormResponse } from '@/components/form-response';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Placeholder, defaultResponse } from '@/constants';
import { ResetPasswordSchema } from '@/schemas';
import { IFormResponse } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, memo, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const ResetPasswordForm: FC = memo(() => {

    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<IFormResponse>(defaultResponse);

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: 'niranjan0881@gmail.com'
        }
    });

    const renderEmailField = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    type="email"
                    placeholder={Placeholder.Email}
                    disabled={isPending}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ), [isPending]);

    const onSubmit = useCallback((values: z.infer<typeof ResetPasswordSchema>) => {
        setResponse(defaultResponse);
        startTransition(async () => {
            try {
                const { error, success } = await resetPassword(values);
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
    }, [form]);

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
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
                            name="email"
                            render={renderEmailField}
                        />
                    </div>
                    <FormResponse response={response} />
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Get reset link
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
});
