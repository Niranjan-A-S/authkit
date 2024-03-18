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
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const LoginForm: FC = memo(() => {
    const searchParams = useSearchParams();
    const urlError = useMemo(() => (searchParams.get('error') === 'OAuthAccountNotLinked'
        ? 'Email already in use with different provider!'
        : ''), [searchParams]);

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<IFormResponse>(
        urlError
            ? {
                type: 'error',
                message: urlError
            }
            : defaultResponse
    );

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
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
            <Button
                variant="link"
                asChild
                size="sm"
                className="px-0 font-normal"
            >
                <Link href="/auth/reset-password">Forgot Password?</Link>
            </Button>
            <FormMessage />
        </FormItem>
    ), [isPending]);

    const renderCodeInput = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Two Factor Code</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    placeholder={Placeholder.Code}
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
                const { error, success, twoFactor } = await login(values);
                if (error) {
                    form.reset();
                    setResponse({ type: 'error', message: error });
                }
                if (success) {
                    form.reset();
                    setResponse({ type: 'success', message: success });
                }
                if (twoFactor) {
                    //NOTE: This step is very important and we should not reset the form from here
                    setResponse({ type: 'success', message: twoFactor });
                    setShowTwoFactor(true);
                };
            } catch (error: any) {
                // TODO this is commented  because of the next redirect error getting thrown
                // setResponse({ type: 'error', message: 'Something went wrong' });
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
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={renderCodeInput}
                            />
                        )}
                        {!showTwoFactor
                            && (
                                <>
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
                                </>
                            )}
                    </div>
                    <FormResponse response={response} />
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        {showTwoFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
    </CardWrapper>
    );
});
