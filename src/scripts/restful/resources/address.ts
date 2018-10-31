import { Record, Resource, ResourceType, withRestfulData } from 'react-restful';

import { apiEntry, restfulStore } from '../environment';
import { City } from './city';
import { County } from './county';
import { User } from './user';

export interface Address extends Record {
    readonly id?: string;
    readonly fullAddress: string;
    readonly city: City;
    readonly county: County;
    readonly phone?: number;
    readonly name?: string;
    readonly createdBy?: User;
    readonly type?: 'apartment' | 'home';
}

export const addressBookResourceType = new ResourceType<Address>({
    store: restfulStore,
    name: nameof<Record>()
});

export const addressBookResources = {
    find: new Resource<Address[]>({
        resourceType: addressBookResourceType,
        url: apiEntry('/address')
    }),
    findOne: new Resource<Address>({
        resourceType: addressBookResourceType,
        method: 'GET',
        url: apiEntry('/address/:id')
    }),
    count: new Resource<number>({
        resourceType: addressBookResourceType,
        method: 'GET',
        url: apiEntry('/address/count')
    }),
    create: new Resource<number>({
        resourceType: addressBookResourceType,
        method: 'POST',
        url: apiEntry('/address')
    }),
    update: new Resource<number>({
        resourceType: addressBookResourceType,
        method: 'PUT',
        url: apiEntry('/address/:id')
    }),
    delete: new Resource<number>({
        resourceType: addressBookResourceType,
        method: 'DELETE',
        url: apiEntry('/address/:id')
    })
};

export interface WithAddressBookProps {
    readonly addresses: Address[];
}

// tslint:disable-next-line:no-any
export const withAddressBook = <T extends WithAddressBookProps>(): any =>
    (Component: React.ComponentType<T>) =>
        withRestfulData<Address, WithAddressBookProps, T>({
            store: restfulStore,
            resourceType: addressBookResourceType,
            mapToProps: (data) => {
                return {
                    addresses: data
                };
            }
        })(Component);