import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

export interface ProductTypeGroup extends Record {
    readonly id?: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypes: ProductType[];
}

export const productTypeGroupResourceType = new ResourceType<ProductTypeGroup>({
    store: restfulStore,
    name: nameof<ProductTypeGroup>(),
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