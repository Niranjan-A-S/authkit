import { IFormResponse } from '@/types/component-props';
import { IButton } from '@/types/index';

export const defaultResponse: IFormResponse = {
    type: 'success',
    message: ''
};

export enum Placeholder {
    Email = 'john.doe@example.com',
    Password = '********',
    Name = 'John Doe',
    Code = '123456'
}

export const buttonItems: IButton[] = [
    { label: 'Server', href: '/server' },
    { label: 'Client', href: '/client' },
    { label: 'Admin', href: '/admin' },
    { label: 'Settings', href: '/settings' }
];
