'use client';

import { ILoginButtonProps } from '@/types/component-props';
import { useRouter } from 'next/navigation';
import React, { FC, memo, useCallback } from 'react';

export const LoginButton: FC<ILoginButtonProps> = memo(({ children, asChild, mode = 'redirect' }) => {

	const router = useRouter();

	const onClick = useCallback(() => {
		router.push('/auth/login');
	}, [router]);

	return mode === 'modal'
		? (
			<span>
				TODO: Implement modal
			</span>
		)
		: (
			<span onClick={onClick} className="cursor-pointer">
				{children}
			</span>
		);
});
