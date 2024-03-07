'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormResponse } from '@/components/form-response';

export const LoginForm: FC = memo(() => {

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
                    placeholder="john.doe@example.com"
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ), []);
    const renderPasswordField = useCallback(({ field }: any) => (
        <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input
                    {...field}
                    type="password"
                    placeholder="******"
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ), []);

    const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    }, []);

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
                    <FormResponse type="success" />
                    <FormResponse type="error" />
                    <Button
                        className="w-full"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Form>
    </CardWrapper>
    );
});
