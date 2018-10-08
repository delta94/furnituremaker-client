import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '../environment';
import { UploadedFile } from './uploadedFile';

export interface Slide extends Record {
    readonly id?: string;
    readonly image: UploadedFile;
}

export const slideResourceType = new ResourceType<Slide>(nameof<Slide>());

export const slideResources = {
    find: new Resource({
        resourceType: slideResourceType,
        url: apiEntry('/slide')
    })
};