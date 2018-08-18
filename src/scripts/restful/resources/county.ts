import { RecordType, ResourceType } from 'react-restful';

import { City } from './city';

export interface County extends RecordType {
    readonly id?: string;
    readonly name: string;
}

export const countyResourceType = new ResourceType<County>({
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
