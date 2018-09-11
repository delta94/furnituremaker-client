import { RecordType, ResourceType } from 'react-restful';

import { restfulStore } from '@/restful/environment';

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
    }, {
        field: nameof<City>(o => o.counties),
        resourceType: nameof<City>(),
        type: 'FK'
    }]
});