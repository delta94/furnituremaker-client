import { FurnitureComponentType } from './furnitureComponentType';
import { QuotaUnit } from './quotaUnit';
import { ProductDesign } from './productDesign';

export interface FurnutureComponent {
    id: string;
    name: string;
    obj: string;
    mtl: string;
    thumbnail: string;
    componentType: FurnitureComponentType;
    quotaValue: number;
    quotaUnit: QuotaUnit;
    designs: ProductDesign[];
    price: number;
}