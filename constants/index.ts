import { IFormResponse } from '@/types/component-props';

export const defaultResponse: IFormResponse = {
    type: 'success',
    message: ''
};

export enum Placeholder {
    Email = 'john.doe@example.com',
    Password = '********'
}
