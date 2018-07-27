import { ResourceType } from 'react-restful';

export interface FurnitureComponentType {
    id: string;
    name: string;
}

export const furnitureComponentTypeResourceType = new ResourceType({
    name: 'furniture-component-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});