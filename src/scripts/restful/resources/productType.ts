import { ResourceType, Resource, RecordType } from 'react-restful';
import { apiEntry } from '../apiEntry';

import { UploadedFile } from './uploadedFile';
import { ProductTypeGroup } from './productTypeGroup';
import { DiscountByQuantities } from './discountByQuantities';

export interface ProductType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypeGroup: ProductTypeGroup | string;
    readonly discountByQuantities?: DiscountByQuantities[];
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
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const productTypeUtils = {
    getDefaultProductType: (productTypes: ProductType[]) => productTypes[0]
};