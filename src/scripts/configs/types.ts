import { ExtendWithStoreValuesProps } from '@/app';
import { ProductTypeGroup, ProductType, ProductDesignGroup, ProductDesign, MaterialType } from '@/restful';

export interface CommonStoreValues {
    readonly selectedProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductType?: ProductType;
    readonly selectedProductDesignGroup?: ProductDesignGroup;
    readonly selectedProductDesign?: ProductDesign;
    readonly selectedMaterialType?: MaterialType;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;