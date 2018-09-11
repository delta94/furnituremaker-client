import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { FurnitureMaterial } from './furnutureMaterial';

export interface MaterialType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly materials?: FurnitureMaterial[];
    readonly view_normalMap: UploadFile;
    readonly view_shiny?: number;
}

export const materialTypeResourceType = new ResourceType<MaterialType>({
    store: restfulStore,
    name: 'materialtype',
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        type: 'MANY',
        field: nameof<MaterialType>(o => o.materials),
        resourceType: 'material'
    }]
});

export const materialTypeResources = {
    find: new Resource<MaterialType[]>({
        resourceType: materialTypeResourceType,
        url: apiEntry('/materialtype'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const materialTypeUtils = {
    getDefaultMaterial: (materialType: MaterialType) => (materialType.materials ? materialType.materials[0] : null)
};

export interface WithMaterialTypesProps {
    readonly materialTypes?: MaterialType[];
}

export const withMaterialTypes = <T extends WithMaterialTypesProps>() =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<T>): any => {
        return restfulDataContainer<MaterialType, T, WithMaterialTypesProps>({
            resourceType: materialTypeResourceType,
            store: restfulStore,
            mapToProps: (data) => ({ materialTypes: data })
        })(Component);
    };