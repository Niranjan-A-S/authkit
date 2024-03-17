'use client';

import { IFormResponse } from '@/types/component-props';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FormResponse } from '../form-response';
import { CardWrapper } from './card-wrapper';
import { verifyEmail } from '@/actions/new-verification';
import { BeatLoader } from 'react-spinners';

const defaultResponse: IFormResponse = {
    type: 'success',
    message: ''
};

export const NewVerificationForm: FC = memo(() => {

    const [response, setResponse] = useState<IFormResponse>(defaultResponse);
    const searchParams = useSearchParams();

    const token = useMemo(() => searchParams.get('token'), [searchParams]);

    const onSubmit = useCallback(async () => {
        if (response.message) return;
        if (!token) return setResponse({ type: 'error', message: 'Verification token is missing' });

        const { error, success } = await verifyEmail(token);

        if (error) setResponse({ type: 'error', message: error });
        else setResponse({ type: 'success', message: success });
    }, [response.message, token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit, response.message, token]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {
                    response.message
                        ? <FormResponse response={response} />
                        : <BeatLoader />
                }
            </div>

        </CardWrapper>
    );
});
