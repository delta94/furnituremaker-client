import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import {
    Record,
    Resource,
    ResourceType,
    Store,
    withRestfulData
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { FurnitureMaterial } from './furnutureMaterial';

export interface MaterialType extends Record {
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

// tslint:disable-next-line:no-any
export const withMaterialTypes = <P extends WithMaterialTypesProps>(): any =>
    withRestfulData<MaterialType, WithMaterialTypesProps, P>({
        resourceType: materialTypeResourceType,
        store: restfulStore,
        mapToProps: (data) => ({ materialTypes: data })
    });