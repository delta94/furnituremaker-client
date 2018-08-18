import { RecordType, Resource, ResourceType } from 'react-restful';

import { County } from './county';

const countyResourceTypeName = nameof<County>();

export interface City extends RecordType {
    readonly id?: string;
    readonly name: string;
    readonly counties: County[];
}

export const cityResourceType = new ResourceType<City>({
    name: nameof<City>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        field: nameof<City>(o => o.counties),
        resourceType: countyResourceTypeName,
        type: 'MANY'
    }]
});

export const cityResources = {
    find: new Resource<City[]>({
        resourceType: cityResourceType,
        url: '/city',
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
                const countyResource = store.getRegisteredResourceType(countyResourceTypeName);
                for (const county of item.counties) {
                    store.mapRecord(countyResource, county);
                }
            }
        }
    })
};