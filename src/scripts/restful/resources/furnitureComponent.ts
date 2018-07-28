import { ResourceType, Resource, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { FurnitureComponentType } from './furnitureComponentType';
import { QuotaUnit } from './quotaUnit';
import { ProductDesign } from './productDesign';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly obj: string;
    readonly mtl: string;
    readonly thumbnail: UploadedFile;
    readonly componentType: FurnitureComponentType;
    readonly quotaValue: number;
    readonly quotaUnit: QuotaUnit;
    readonly design: ProductDesign;
    readonly price: number;
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
                store.dataMapping(resourceType, item);
            }
        }
    })
};