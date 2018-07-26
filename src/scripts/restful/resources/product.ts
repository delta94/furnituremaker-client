import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { ProductModule } from './productModule';

export interface Product {
    id: string;
    design: ProductDesign;
    productType: ProductType;
    modules: ProductModule[];
    totalPrice: number;
}