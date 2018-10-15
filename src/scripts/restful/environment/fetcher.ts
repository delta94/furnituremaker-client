import { Fetcher } from 'react-restful';

import { AntdMotification } from '@/components/antd-component';
import { clearToken, getToken } from '@/configs';

import { restfulStore } from './store';

interface ErrorResponse {
    readonly error: string;
    readonly message: string;
    readonly statusCode: number;
}

export const restfulFetcher = new Fetcher({
    store: restfulStore,
    requestBodyParser: (key, value) => {
        if (value.id) {
            return value.id;
        }

        return value;
    },
    beforeFetch: (url: string, requestInit: RequestInit) => {
        const token = getToken();
        if (token && requestInit.headers instanceof Headers) {
            requestInit.headers.append('Authorization', `Bearer ${token}`);
        }
        return requestInit;
    },
    afterFetch: async (response) => {
        if (response.ok) {
            return;
        }

        AntdMotification.error({
            message: 'Opps!',
            description: response.statusText
        });

        const responseContentType = response.headers.get('content-type');

        if (
            responseContentType &&
            responseContentType.startsWith('application/json')
        ) {
            const result = await response.json() as ErrorResponse;
            if (result.message === 'Invalid token.') {
                clearToken();
                window.location.reload();
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            const error = await response.text();
            // tslint:disable-next-line:no-console
            console.error(error);
        }
    }
});