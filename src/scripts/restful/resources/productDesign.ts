
import { ResourceType, Resource, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { ProductType } from './productType';
import { ProductDesignGroup } from './productDesignGroup';
import { UploadedFile } from './uploadedFile';

export interface ProductDesign extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productType: ProductType;
    readonly designGroup: ProductDesignGroup;
}

export const productDesign = new ResourceType({
    name: 'product-design',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productDesignResources = {
    find: new Resource<ProductDesign[]>({
        resourceType: productDesign,
        url: apiEntry('/design'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};