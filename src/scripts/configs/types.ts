import { ExtendWithStoreValuesProps } from '@/app';
import { ProductTypeGroup, ProductType, ProductDesignGroup, ProductDesign, MaterialType, Product } from '@/restful';

export type Include<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>;

export interface CommonStoreValues {
    readonly appState?: 'PENDING' | 'READY';
    readonly hoveredProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductType?: ProductType;
    readonly selectedProductDesignGroup?: ProductDesignGroup;
    readonly selectedProductDesign?: ProductDesign;
    readonly selectedMaterialType?: MaterialType;
    readonly selectedProduct?: Product;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;