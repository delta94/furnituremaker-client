import { FurnitureComponent } from './furnitureComponent';
import { FurnutureMaterial } from './furnutureMaterial';

export interface ProductModule {
    readonly id?: string;
    readonly component: FurnitureComponent;
    readonly componentPrice: number;
    readonly material: FurnutureMaterial;
    readonly materialPrice: number;
}