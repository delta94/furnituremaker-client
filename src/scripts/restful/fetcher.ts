import { Fetcher } from 'react-restful';

import { getToken } from '@/configs';

import { restfulStore } from './store';

class RestfulFetcher extends Fetcher {
    async beforeFetch(url: string, requestInit: RequestInit) {
        const token = getToken();
        if (token && requestInit.headers instanceof Headers) {
            requestInit.headers.append('Authorization', `Bearer ${token}`);
        }
        return requestInit;
    }
}

export const restfulFetcher = new RestfulFetcher({
    store: restfulStore
});