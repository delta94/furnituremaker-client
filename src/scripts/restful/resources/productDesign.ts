
import { ResourceType, Resource, RecordType } from 'react-restful';

import { UploadedFile, completeFileUrl } from './uploadedFile';
import { apiEntry } from '@/restful/apiEntry';

import { ProductType } from './productType';
import { ProductDesignGroup } from './productDesignGroup';

export interface ProductDesign extends RecordType {
    id: string;
    name: string;
    thumbnail: UploadedFile;
    productType: ProductType;
    productGroup: ProductDesignGroup;
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
                item.thumbnail = completeFileUrl(item.thumbnail);
                store.dataMapping(resourceType, item);
            }
        }
    })
};