import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { MaterialType } from '@/restful/resources/materialType';

import { apiEntry } from '../apiEntry';
import { FurnitureComponentType } from './furnitureComponentType';
import { ProductDesign } from './productDesign';
import { QuotaUnit } from './quotaUnit';
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

export const withComponents = (store: Store) =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<WithComponentsProps>): any => {
        return restfulDataContainer<FurnitureComponent, WithComponentsProps>({
            resourceType: furnitureComponentResourceType,
            store: store,
            mapToProps: (data) => ({ components: data })
        })(Component);
    };