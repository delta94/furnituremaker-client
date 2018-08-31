import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { CommonStoreProps } from '@/configs';

import { apiEntry } from '../apiEntry';
import { MaterialType } from './materialType';
import { UploadedFile } from './uploadedFile';

export interface FurnutureMaterial extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly texture: UploadedFile;
    readonly materialType: MaterialType;
    readonly price: number;
    readonly inStock: boolean;
    readonly code: string;
    readonly description?: string;
}

export const furnutureMaterialResouceType = new ResourceType<FurnutureMaterial>({
    name: 'material',
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        field: nameof<FurnutureMaterial>(o => o.materialType),
        resourceType: 'materialtype',
        type: 'FK'
    }]
});

export const furnutureMaterialResources = {
    find: new Resource<FurnutureMaterial[]>({
        resourceType: furnutureMaterialResouceType,
        url: apiEntry('/material'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export interface WithMaterialProps {
    readonly materials?: FurnutureMaterial[];
}

export const withMaterialsByType = (store: Store) =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<WithMaterialProps>): any => {
        return restfulDataContainer<FurnutureMaterial, WithMaterialProps>({
            resourceType: furnutureMaterialResouceType,
            store: store,
            mapToProps: (data, ownProps: CommonStoreProps) => {
                if (!data) {
                    return;
                }

                const { selectedMaterialType } = ownProps;
                return {
                    materials: data.filter(o => o.materialType.id === selectedMaterialType.id)
                };
            }
        })(Component);
    };

export const withMaterials = (store: Store) =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<WithMaterialProps>): any => {
        return restfulDataContainer<FurnutureMaterial, WithMaterialProps>({
            resourceType: furnutureMaterialResouceType,
            store: store,
            mapToProps: (data) => ({ materials: data })
        })(Component);
    };