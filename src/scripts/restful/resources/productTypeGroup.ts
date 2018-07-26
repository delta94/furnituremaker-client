import { ResourceType, Resource, RecordType } from 'react-restful';

import { UploadedFile, completeFileUrl } from './uploadedFile';
import { apiEntry } from '../apiEntry';

export interface ProductTypeGroup extends RecordType {
    id?: string;
    name: string;
    thumbnail: UploadedFile;
}

export const productTypeGroup = new ResourceType({
    name: 'product-type-group',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productTypeGroupResources = {
    find: new Resource<ProductTypeGroup[]>({
        resourceType: productTypeGroup,
        url: apiEntry('/producttypegroup'),
        method: 'GET',
        mapDataToStore: (productTypeGroups, resourceType, store) => {
            for (const item of productTypeGroups) {
                item.thumbnail = completeFileUrl(item.thumbnail);
                store.dataMapping(resourceType, item);
            }
        }
    })
};