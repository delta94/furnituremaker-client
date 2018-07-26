import { MaterialType } from './materialType';

export interface FurnutureMaterial {
    id: string;
    name: string;
    texture: string;
    materialType: MaterialType;
    price: number;
    inStock: boolean;
}