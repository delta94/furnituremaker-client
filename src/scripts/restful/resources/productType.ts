import { ResourceType, Resource, RecordType } from 'react-restful';
import { apiEntry } from '../apiEntry';

import { UploadedFile, completeFileUrl } from './uploadedFile';
import { ProductTypeGroup } from '@/restful/resources/productTypeGroup';

export interface ProductType extends RecordType {
    id: string;
    name: string;
    thumbnail: UploadedFile;
    productTypeGroup: ProductTypeGroup;
}

export const productType = new ResourceType({
    name: 'product-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productTypeResources = {
    find: new Resource<ProductType[]>({
        resourceType: productType,
        url: apiEntry('/producttype'),
        method: 'GET',
        mapDataToStore: (customers, resourceType, store) => {
            for (const item of customers) {
                item.thumbnail = completeFileUrl(item.thumbnail);
                store.dataMapping(resourceType, item);
            }
        }
    })
};