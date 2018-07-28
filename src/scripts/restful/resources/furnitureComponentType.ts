import { ResourceType } from 'react-restful';
import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentType {
    id: string;
    name: string;
    furnitureComponents: FurnitureComponent[];
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
                if (!existingFurnitureComponentType.furnitureComponents) {
                    existingFurnitureComponentType.furnitureComponents = [];
                }
                existingFurnitureComponentType.furnitureComponents.push(furnitureComponent);
                continue;
            } else {
                furnitureComponentType.furnitureComponents = [];
                furnitureComponentType.furnitureComponents.push(furnitureComponent);
                furnitureComponentTypes.push(furnitureComponentType);
            }
        }

        return furnitureComponentTypes;
    }
};