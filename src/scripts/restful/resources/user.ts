import { Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { Agency } from './agency';
import { Role } from './role';

export interface User {
    readonly id: string;
    readonly name?: string;
    readonly email: string;
    readonly role: Role;
    readonly agency?: Agency;
    readonly createdAt?: string;
    readonly username: string;
    readonly phone: string;
    readonly dayOfBirth: number;
    readonly monthOfBirth: number;
    readonly yearOfBirth: number;
    readonly gender: 'male' | 'famale';
    readonly fullName?: string;
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
    }),
    update: new Resource<User>({
        resourceType: userResourceType,
        url: apiEntry('/user/:id'),
        method: 'PUT',
        requestBodyParser: (key, val) => {
            if (key === 'email') {
                return undefined;
            }
            
            if (key === 'agency' || key === 'role') {
                return val.id;
            }

            return val;
        }
    })
};