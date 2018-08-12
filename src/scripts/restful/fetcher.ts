import { Fetcher, Resource, ResourceParameter } from 'react-restful';

import { getToken } from '@/configs';

import { restfulStore } from './store';

class RestfulFetcher extends Fetcher {
    readonly createDefaultRequestInit = () => ({ headers: new Headers() });

    fetch(url: string, requestInit: RequestInit) {
        const token = getToken();
        if (token && requestInit.headers instanceof Headers) {
            requestInit.headers.append('Authorization', `Bearer ${token}`);
        }

        return fetch(url, requestInit);
    }

    async fetchResource<DataModel>(resource: Resource<DataModel>, params: ResourceParameter[]) {
        try {
            const url = resource.urlReslover(params);
            const requestInit: RequestInit = resource.requestInitReslover(params) || this.createDefaultRequestInit();
            requestInit.method = resource.method;

            const response = await this.fetch(url, requestInit);

            if (!response.ok) {
                throw response;
            }

            const responseContentType = response.headers.get('content-type');
            if (responseContentType && responseContentType.startsWith('application/json')) {
                const json = await response.json();
                if (resource.mapDataToStore) {
                    resource.mapDataToStore(json, resource.recordType, this.store);
                }
                return json;
            }
            return await response.text();
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            throw new Error(error);
        }
    }
}

export const restfulFetcher = new RestfulFetcher({
    store: restfulStore
});