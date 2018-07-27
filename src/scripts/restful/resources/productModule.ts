import { FurnitureComponent } from './furnitureComponent';
import { FurnutureMaterial } from './furnutureMaterial';

export interface ProductModule {
    id: string;
    component: FurnitureComponent;
    componentPrice: number;
    material: FurnutureMaterial;
    materialPrice: number;
}