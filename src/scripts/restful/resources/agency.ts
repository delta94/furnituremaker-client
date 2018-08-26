import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { apiEntry } from '@/restful/apiEntry';

import { AgencyLevel } from './agencyLevel';
import { User } from './user';

export interface Agency extends RecordType {
    readonly id?: number;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly level: AgencyLevel;
    readonly user: User;
}

export const agencyResourceType = new ResourceType<Agency>({
    name: nameof<Agency>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const agencyResources = {
    find: new Resource<Agency[]>({
        resourceType: agencyResourceType,
        method: 'GET',
        url: apiEntry('/agency'),
        mapDataToStore: (agencies, resourceType, store) => {
            for (const agency of agencies) {
                store.mapRecord(resourceType, agency);
            }
        }
    })
};

export interface WithAllAgenciesProps {
    readonly agencies?: Agency[];
}

export const withAllAgencies = (store) =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<WithAllAgenciesProps>): any =>
        restfulDataContainer<Agency, WithAllAgenciesProps>({
            resourceType: agencyResourceType,
            store: store,
            mapToProps: (agencies) => {
                return { agencies };
            }
        })(Component);