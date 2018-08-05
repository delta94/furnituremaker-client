import { Resource, ResourceType } from 'react-restful';
import { apiEntry } from '@/restful/apiEntry';

export interface User {
    readonly id?: string;
}

export const userResourceType = new ResourceType({
    name: 'user',
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
        },
        meta: {
            silent: true
        }
    })
};