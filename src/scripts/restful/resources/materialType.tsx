import * as React from 'react';
import {
    ResourceType,
    Resource,
    RecordType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { FurnutureMaterial } from './furnutureMaterial';
import { apiEntry } from '../apiEntry';

export interface MaterialType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly materials?: FurnutureMaterial[];
}

export const materialTypeResourceType = new ResourceType({
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

export const withMaterialTypes = (store: Store) =>
    // tslint:disable-next-line:no-any 
    (Component: React.ComponentType<WithMaterialTypesProps>): any => {
        return restfulDataContainer<MaterialType, WithMaterialTypesProps>({
            resourceType: materialTypeResourceType,
            store: store,
            mapToProps: (data) => ({ materialTypes: data })
        })(Component);
    };