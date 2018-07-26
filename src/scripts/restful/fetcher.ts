import { Fetcher, Resource, ResourceParameter } from 'react-restful';
import { restfulStore } from './store';

class RestfulFetcher extends Fetcher {
    fetch(url: string, requestInit: RequestInit) {
        return fetch(url, requestInit);
    }

    async fetchResource<DataModel>(resource: Resource<DataModel>, params: ResourceParameter[]) {
        try {
            const url = resource.urlReslover(params);
            const fetchInit = resource.requestInitReslover(params);

            const response = await this.fetch(url, fetchInit as RequestInit);

            if (!response.ok) {
                const responseText = await response.text();
                throw responseText;
            } else {
                const responseContentType = response.headers.get('content-type');
                if (responseContentType && responseContentType.startsWith('application/json')) {
                    const json = await response.json();
                    if (resource.mapDataToStore) {
                        resource.mapDataToStore(json, resource.recordType, this.store);
                    }
                    return json;
                }
                return await response.text();
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const resfulFetcher = new RestfulFetcher({
    store: restfulStore
});