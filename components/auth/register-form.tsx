'use client';

import { register } from '@/actions/register';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormResponse } from '@/components/form-response';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Placeholder, defaultResponse } from '@/constants';
import { RegisterSchema } from '@/schemas';
import { IFormResponse } from '@/types/component-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, memo, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const RegisterForm: FC = memo(() => {

    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<IFormResponse>(defaultResponse);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
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
    const renderNameField = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    placeholder={Placeholder.Name}
                    disabled={isPending}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ), [isPending]);

    const onSubmit = useCallback((values: z.infer<typeof RegisterSchema>) => {
        setResponse(defaultResponse);
        startTransition(async () => {
            try {
                const { error, success } = await register(values);
                setResponse(error
                    ? { type: 'error', message: error }
                    : { type: 'success', message: success }
                );
            } catch (error: any) {
                setResponse({ type: 'error', message: error?.message || 'Something went wrong' });
            }
        });
    }, []);

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={renderNameField}
                        />
                    </div>
                    <FormResponse response={response} />
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
});
