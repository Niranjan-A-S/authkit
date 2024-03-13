'use client';

import { login } from '@/actions/login';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormResponse } from '@/components/form-response';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Placeholder, defaultResponse } from '@/constants';
import { LoginSchema } from '@/schemas';
import { IFormResponse } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, memo, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const LoginForm: FC = memo(() => {

    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<IFormResponse>(defaultResponse);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: 'test@test.com',
            password: 'Pass@word1'
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

    const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
        setResponse(defaultResponse);
        startTransition(async () => {
            try {
                const { error, success } = await login(values);
                setResponse(error
                    ? { type: 'error', message: error }
                    : { type: 'success', message: success }
                );
            } catch (error: any) {
                // TODO this is commented  because of the next redirect error getting thrown
                // setResponse({ type: 'error', message: 'Something went wrong' });
            } finally {
                form.reset();
            }
        });
    }, [form]);

    return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
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
                        Login
                    </Button>
                </form>
            </Form>
    </CardWrapper>
    );
});
