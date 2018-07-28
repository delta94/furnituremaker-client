import { ResourceType } from 'react-restful';
import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentType {
    readonly id: string;
    readonly name: string;
    readonly furnitureComponents: FurnitureComponent[];
}

export const furnitureComponentTypeResourceType = new ResourceType({
    name: 'furniture-component-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const furnitureComponentTypeUtils = {
    fromFurnitureComponents: (furnitureComponents: FurnitureComponent[]): FurnitureComponentType[] => {
        const furnitureComponentTypes: FurnitureComponentType[] = [];

        for (const furnitureComponent of furnitureComponents) {
            const furnitureComponentType = furnitureComponent.componentType;

            const existingFurnitureComponentType =
                furnitureComponentTypes.find(o => o.id === furnitureComponentType.id);

            if (existingFurnitureComponentType) {
                existingFurnitureComponentType.furnitureComponents.push(furnitureComponent);
                continue;
            } else {
                const furnitureComponentTypeWithComponent: FurnitureComponentType = {
                    ...furnitureComponentType,
                    furnitureComponents: [furnitureComponent]
                };
                furnitureComponentTypes.push(furnitureComponentTypeWithComponent);
            }
        }

        return furnitureComponentTypes;
    }
};