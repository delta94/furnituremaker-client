import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

export interface Page extends Record {
    readonly id?: string;
    readonly title: string;
    readonly slug: string;
    readonly content: string;
}

export const pageResourceType = new ResourceType<Page>({
    store: restfulStore,
    name: nameof<Page>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const pageResources = {
    find: new Resource<Page>({
        resourceType: pageResourceType,
        method: 'GET',
        url: apiEntry('/pages'),
        mapDataToStore: (page, resourceType, store) => {
            store.mapRecord(resourceType, page);
        }
    })
};