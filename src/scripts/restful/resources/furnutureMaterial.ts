import { MaterialType } from './materialType';

export interface FurnutureMaterial {
    readonly id: string;
    readonly name: string;
    readonly texture: string;
    readonly materialType: MaterialType;
    readonly price: number;
    readonly inStock: boolean;
}