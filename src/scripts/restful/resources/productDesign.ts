import { ProductType } from './productType';
import { ProductGroup } from './productGroup';

export interface ProductDesign {
    id: string;
    name: string;
    productType: ProductType;
    productGroup: ProductGroup;
}