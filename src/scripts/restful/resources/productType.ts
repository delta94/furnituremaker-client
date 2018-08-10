import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '../apiEntry';
import { DiscountByQuantity } from './discountByQuantities';
import { ProductTypeGroup } from './productTypeGroup';
import { UploadedFile } from './uploadedFile';

export interface ProductType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypeGroup: ProductTypeGroup | string;
    readonly discountByQuantities?: DiscountByQuantity[];
}

export const productType = new ResourceType({
    name: nameof<ProductType>(),
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
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const productTypeUtils = {
    getDefaultProductType: (productTypes: ProductType[]) => productTypes[0]
};