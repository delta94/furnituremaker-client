import { Fetcher } from 'react-restful';

import { getToken } from '@/configs';

import { restfulStore } from './store';

export const restfulFetcher = new Fetcher({
    store: restfulStore,
    beforeFetch: (url: string, requestInit: RequestInit) => {
        const token = getToken();
        if (token && requestInit.headers instanceof Headers) {
            requestInit.headers.append('Authorization', `Bearer ${token}`);
        }
        return requestInit;
    }
});