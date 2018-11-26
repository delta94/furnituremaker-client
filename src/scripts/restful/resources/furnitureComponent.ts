import {
    Record,
    Resource,
    ResourceType,
    Store,
    withRestfulData
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { ComponentGroup } from './componentGroup';
import { FurnitureComponentType } from './furnitureComponentType';
import { MaterialType } from './materialType';
import { ProductDesign } from './productDesign';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends Record {
    readonly id?: string;
    readonly name: string;
    readonly obj?: UploadedFile;
    readonly mtl?: UploadedFile;
    readonly thumbnail?: UploadedFile;
    readonly componentType: FurnitureComponentType;
    readonly materialTypes: MaterialType[];
    readonly quotaValue: number;
    readonly design: ProductDesign;
    readonly price: number;
    readonly fbx?: UploadedFile;
    readonly displayName: string;
    readonly code: string;
    readonly height?: number;
    readonly componentGroup?: ComponentGroup;
    readonly isDefault?: boolean;
    readonly noSelection?: boolean;
}

export const furnitureComponentResourceType = new ResourceType<FurnitureComponent>({
    store: restfulStore,
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
    }),
    create: new Resource<FurnitureComponent>({
        resourceType: furnitureComponentResourceType,
        url: apiEntry('/components'),
        method: 'POST',
        mapDataToStore: (item, resourceType, store) => {
            store.dataMapping(resourceType, item);
        }
    }),
};

export interface WithComponentsProps {
    readonly components?: FurnitureComponent[];
}

// tslint:disable-next-line:no-any
export const withComponents = <T extends WithComponentsProps>(): any =>
    withRestfulData<FurnitureComponent, WithComponentsProps, T>({
        resourceType: furnitureComponentResourceType,
        store: restfulStore,
        mapToProps: (data) => ({ components: data })
    });