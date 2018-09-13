import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { AgencyLevel } from './agencyLevel';
import { City } from './city';
import { County } from './county';
import { User } from './user';

export interface Agency extends RecordType {
    readonly id?: string;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly level: AgencyLevel;
    readonly user: User;
    readonly city: City;
    readonly county: County;
}

export const agencyResourceType = new ResourceType<Agency>({
    store: restfulStore,
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
    }),
    findOne: new Resource<Agency>({
        resourceType: agencyResourceType,
        method: 'GET',
        url: apiEntry('/agency/:id'),
        mapDataToStore: (agency, resourceType, store) => {
            store.mapRecord(resourceType, agency);
        }
    })
};

export const agencyUtils = {
    getOrderDiscountByLevel: (agency: Agency, orderPrice: number) => {
        if (!agency || !agency.level) {
            return 0;
        }
        const discountValue = (agency.level.discountPercent * 0.01) * orderPrice;
        return discountValue;
    }
};

export interface WithAllAgenciesProps {
    readonly agencies?: Agency[];
}

// tslint:disable-next-line:no-any
export const withAllAgencies = <T extends WithAllAgenciesProps>(): any =>
    restfulDataContainer<Agency, T, WithAllAgenciesProps>({
        resourceType: agencyResourceType,
        store: restfulStore,
        getMappingDataFromProps: (props) => props.agencies,
        mapToProps: (agencies) => {
            return { agencies };
        }
    });