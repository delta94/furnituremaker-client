import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentType extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
}

export const furnitureComponentTypeResourceType = new ResourceType({
    store: restfulStore,
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
            if (!furnitureComponentType) {
                return curentValues;
            }

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
    },
    /** Gen 3 random chars */
    genCode: () => {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const code = [0, 1, 2].map(o => {
            const randomChar = possible.charAt(Math.floor(Math.random() * possible.length));
            return randomChar;
        });

        return code.join();
    }
};