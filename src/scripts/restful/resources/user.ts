import { Resource, ResourceType, restfulDataContainer } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { Agency } from './agency';
import { Role } from './role';

export interface User {
    readonly id: string;
    readonly name?: string;
    readonly email: string;
    readonly role: Role;
    readonly agency?: Agency;
}

export const userResourceType = new ResourceType<User>({
    store: restfulStore,
    name: nameof<User>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export interface UserAuthResponse {
    readonly user: User;
    readonly jwt: string;
}

export const userResources = {
    auth: new Resource<UserAuthResponse>({
        resourceType: userResourceType,
        url: apiEntry('/auth/local'),
        method: 'POST',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data.user);
        }
    }),
    me: new Resource<User>({
        resourceType: userResourceType,
        url: apiEntry('/user/me'),
        method: 'GET',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data);
        }
    })
};

export interface WithCurrentUserProps {
    readonly user?: User;
}

export const withCurrentUser = <T>() =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<T>): any =>
        restfulDataContainer<User, T, WithCurrentUserProps>({
            resourceType: userResourceType,
            store: restfulStore,
            mapToProps: (data) => {
                return {
                    user: data[0]
                };
            }
        })(Component);