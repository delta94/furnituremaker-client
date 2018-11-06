import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '../environment';
import { UploadedFile } from './uploadedFile';
import { User } from './user';

export interface AccountRequest extends Record {
    readonly id: number;
    readonly createdBy: User;
    readonly companyName: string;
    readonly businessAreas: string;
    readonly businessLicense: UploadedFile;
    readonly confirmed?: boolean;
}

export const accountRequestResourceType = new ResourceType<AccountRequest>(nameof<AccountRequest>());

export const accountRequestResources = {
    find: new Resource<AccountRequest>({
        resourceType: accountRequestResourceType,
        method: 'GET',
        url: apiEntry('/accountrequests')
    }),
    create: new Resource<number>({
        resourceType: accountRequestResourceType,
        method: 'POST',
        url: apiEntry('/accountrequests')
    }),
};