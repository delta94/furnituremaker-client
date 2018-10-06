import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { ProductDesignGroup } from './productDesignGroup';
import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

export interface ProductDesign extends Record {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productType: ProductType;
    readonly designGroup: ProductDesignGroup;
    readonly title?: string;
    readonly coverPhoto?: UploadedFile;
    readonly coverPhotoShape?: 'square' | 'rectangle';
    readonly photos: UploadedFile[];
}

export const productDesign = new ResourceType<ProductDesign>({
    store: restfulStore,
    name: nameof<ProductDesign>(),
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

export const productDesignUtils = {
    getDefaultProductDesigns: (productDesigns: ProductDesign[]) => productDesigns[0]
};