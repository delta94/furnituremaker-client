import { ResourceType, Resource, RecordType, Store, restfulDataContainer } from 'react-restful';

import { MaterialType } from './materialType';
import { apiEntry } from '../apiEntry';
import { UploadedFile } from './uploadedFile';
import { CommonStoreProps } from '@/configs';

export interface FurnutureMaterial extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly texture: UploadedFile;
    readonly materialType: MaterialType;
    readonly price: number;
    readonly inStock: boolean;
}

export const furnutureMaterialResouceType = new ResourceType({
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

export const withMaterials = (store: Store) =>
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