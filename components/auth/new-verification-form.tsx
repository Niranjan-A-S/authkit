'use client';

import { IFormResponse } from '@/types/component-props';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { FormResponse } from '../form-response';
import { CardWrapper } from './card-wrapper';

const defaultResponse: IFormResponse = {
    type: 'error',
    message: ''
};

export const NewVerificationForm: FC = memo(() => {

    const [response, setResponse] = useState<IFormResponse>(defaultResponse);
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(async (token: string) => {
        //TODO: new verification action
    }, []);

    useEffect(() => {
        if (response.message) return;
        if (!token) return setResponse({ type: 'error', message: 'Verification token is missing' });

        onSubmit(token);
    }, [onSubmit, response.message, token]);

    return <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <div className="flex items-center w-full justify-center">
            {
                response.message
                    ? <FormResponse response={response} />
                    : <span>Loading</span>
            }
            {/* TODO:use BeatSpinner from react-spinners */}
        </div>

    </CardWrapper>;
});
