'use client';

import { logout } from '@/actions/logout';
import { IParentProps } from '@/types/component-props';
import { FC, memo, useCallback } from 'react';

export const LogoutButton: FC<IParentProps> = memo(({ children }) => {

	const onClick = useCallback(() => {
		logout();
	}, []);

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
});
