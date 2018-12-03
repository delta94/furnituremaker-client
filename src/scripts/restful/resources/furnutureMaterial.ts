import { Record, Resource, ResourceType, withRestfulData } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import { apiEntry, restfulStore } from '@/restful/environment';

import { MaterialType } from './materialType';
import { UploadedFile } from './uploadedFile';

export interface FurnitureMaterial extends Record {
    readonly id: string;
    readonly name: string;
    readonly texture: UploadedFile;
    readonly materialType: MaterialType;
    readonly price: number;
    readonly inStock: boolean;
    readonly code: string;
    readonly description?: string;
    readonly view_normalMap?: UploadedFile;
    readonly isDefault?: boolean;
    readonly displayName?: string;
}

export const furnitureMaterialResouceType = new ResourceType<FurnitureMaterial>({
    store: restfulStore,
    name: 'material',
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        field: nameof<FurnitureMaterial>(o => o.materialType),
        resourceType: 'materialtype',
        type: 'FK'
    }]
});

export const furnitureMaterialResources = {
    find: new Resource<FurnitureMaterial[]>({
        resourceType: furnitureMaterialResouceType,
        url: apiEntry('/material'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                if (!item.materialType) {
                    continue;
                }
                
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export interface WithMaterialProps {
    readonly materials?: FurnitureMaterial[];
}

type WithMaterialByTypeOwnProps = Pick<CommonStoreProps, 'selectedMaterialType'> & WithMaterialProps;

// tslint:disable-next-line:no-any
export const withMaterialsByType = <T extends Required<WithMaterialByTypeOwnProps>>(): any => {
    return withRestfulData<FurnitureMaterial, WithMaterialProps, T>({
        resourceType: furnitureMaterialResouceType,
        store: restfulStore,
        mapToProps: (data, ownProps) => {
            if (!data) {
                return;
            }

            const { selectedMaterialType } = ownProps;
            if (!selectedMaterialType) {
                return {
                    materials: data
                };
            }
            return {
                materials: data.filter(o => o.materialType.id === selectedMaterialType.id)
            };
        }
    });
};

// tslint:disable-next-line:no-any
export const withMaterials = <T extends WithMaterialProps>(): any => {
    return withRestfulData<FurnitureMaterial, WithMaterialProps, T>({
        resourceType: furnitureMaterialResouceType,
        store: restfulStore,
        mapToProps: (data) => ({ materials: data })
    });
};