import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { City } from './city';

export interface County extends RecordType {
    readonly id?: string;
    readonly name: string;
}

export const countyResourceType = new ResourceType<County>({
    store: restfulStore,
    name: nameof<County>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const countyResources = {
    find: new Resource<County[]>({
        resourceType: countyResourceType,
        url: apiEntry('/county'),
        method: 'GET',
        mapDataToStore: (counties, resourceType, store) => {
            for (const county of counties) {
                store.mapRecord(resourceType, county);
            }
        }
    }),
    findOne: new Resource<County>({
        resourceType: countyResourceType,
        url: apiEntry('/county/:id'),
        method: 'GET',
        mapDataToStore: (county, resourceType, store) => {
            store.mapRecord(resourceType, county);
        }
    })
};