import { FurnutureComponent } from './furnitureComponent';
import { FurnutureMaterial } from './furnutureMaterial';

export interface ProductModule {
    id: string;
    component: FurnutureComponent;
    componentPrice: number;
    material: FurnutureMaterial;
    materialPrice: number;
}