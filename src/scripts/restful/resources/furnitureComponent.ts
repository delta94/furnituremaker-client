import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';
import { MaterialType } from '@/restful/resources/materialType';

import { FurnitureComponentType } from './furnitureComponentType';
import { ProductDesign } from './productDesign';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends RecordType {
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

export const withComponents = <T extends WithComponentsProps>() =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<T>): any => {
        return restfulDataContainer<FurnitureComponent, T, WithComponentsProps>({
            resourceType: furnitureComponentResourceType,
            store: restfulStore,
            mapToProps: (data) => ({ components: data })
        })(Component);
    };