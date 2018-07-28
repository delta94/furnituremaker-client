import { ResourceType, Resource, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { FurnitureComponentType } from './furnitureComponentType';
import { QuotaUnit } from './quotaUnit';
import { ProductDesign } from './productDesign';
import { completeFileUrl, UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends RecordType {
    id: string;
    name: string;
    obj: string;
    mtl: string;
    thumbnail: UploadedFile;
    componentType: FurnitureComponentType;
    quotaValue: number;
    quotaUnit: QuotaUnit;
    design: ProductDesign;
    price: number;
}

export const furnitureComponentResourceType = new ResourceType({
    name: 'furniture-component-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const furnitureComponentResources = {
    find: new Resource<FurnitureComponent[]>({
        resourceType: furnitureComponentResourceType,
        url: apiEntry('/components'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                item.thumbnail = completeFileUrl(item.thumbnail);
                store.dataMapping(resourceType, item);
            }
        }
    })
};