import { ResourceType, Resource, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
}

export const furnitureComponentTypeResourceType = new ResourceType({
    name: 'furniture-component-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const furnitureComponentTypeResources = {
    find: new Resource<FurnitureComponentType[]>({
        resourceType: furnitureComponentTypeResourceType,
        url: apiEntry('/componenttype'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const furnitureComponentTypeUtils = {
    fromFurnitureComponents: (furnitureComponents: FurnitureComponent[]): FurnitureComponentType[] => {
        const furnitureComponentTypes: FurnitureComponentType[] = [];

        for (const furnitureComponent of furnitureComponents) {
            const furnitureComponentType = furnitureComponent.componentType;

            const existingFurnitureComponentType =
                furnitureComponentTypes.find(o => o.id === furnitureComponentType.id);

            if (existingFurnitureComponentType) {
                existingFurnitureComponentType.components.push(furnitureComponent);
            } else {
                const furnitureComponentTypeWithComponent: FurnitureComponentType = {
                    ...furnitureComponentType,
                    components: [furnitureComponent]
                };
                furnitureComponentTypes.push(furnitureComponentTypeWithComponent);
            }
        }

        return furnitureComponentTypes;
    }
};