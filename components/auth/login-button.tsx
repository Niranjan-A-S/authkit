'use client';

import { ILoginButtonProps } from '@/types/component-props';
import { useRouter } from 'next/navigation';
import React, { FC, memo, useCallback } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { LoginForm } from './login-form';

export const LoginButton: FC<ILoginButtonProps> = memo(({ children, asChild, mode = 'redirect' }) => {

	const router = useRouter();

	const onClick = useCallback(() => {
		router.push('/auth/login');
	}, [router]);

	return mode === 'modal'
		? (
			<Dialog>
				<DialogTrigger asChild={asChild}>
					{children}
				</DialogTrigger>
				<DialogContent className='p-0 w-auto bg-transparent border-none'>
					<LoginForm />
				</DialogContent>
			</Dialog>
		)
		: (
			<span onClick={onClick} className="cursor-pointer">
				{children}
			</span>
		);
});
