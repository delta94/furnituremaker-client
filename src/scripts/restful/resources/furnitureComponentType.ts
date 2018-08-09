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
        const furnitureComponentsReducer = (
            curentValues: FurnitureComponentType[],
            furnitureComponent: FurnitureComponent
        ): FurnitureComponentType[] => {
            const furnitureComponentType = furnitureComponent.componentType;

            const existingFurnitureComponentType =
                curentValues.find(o => o.id === furnitureComponentType.id);

            if (!existingFurnitureComponentType) {
                const furnitureComponentTypeWithComponent: FurnitureComponentType = {
                    ...furnitureComponentType,
                    components: [furnitureComponent]
                };

                return [...curentValues, furnitureComponentTypeWithComponent];
            }

            const updatedComponentTypes = curentValues.map((o: FurnitureComponentType) => {
                if (o === existingFurnitureComponentType) {
                    return {
                        ...existingFurnitureComponentType,
                        components: [
                            ...existingFurnitureComponentType.components,
                            furnitureComponent
                        ]
                    };
                }
                return o;
            });
            return updatedComponentTypes;
        };

        const furnitureComponentTypes = furnitureComponents
            .reduce(furnitureComponentsReducer, []);

        return furnitureComponentTypes;
    }
};