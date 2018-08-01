import { ResourceType, Resource, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { UploadedFile } from './uploadedFile';
import { ProductType } from './productType';

export interface ProductTypeGroup extends RecordType {
    readonly id?: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypes: ProductType[];
}

export const productTypeGroupResourceType = new ResourceType({
    name: 'product-type-group',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productTypeGroupResources = {
    find: new Resource<ProductTypeGroup[]>({
        resourceType: productTypeGroupResourceType,
        url: apiEntry('/producttypegroup'),
        method: 'GET',
        mapDataToStore: (productTypeGroups, resourceType, store) => {
            for (const item of productTypeGroups) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const productTypeGroupUtils = {
    getDefaultProductTypeGroup: (productTypeGroups: ProductTypeGroup[]) => productTypeGroups[0]
};