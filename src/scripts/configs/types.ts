import { WithStoreValuesProps, ExtendWithStoreValuesProps } from '@/app';

export interface CommonStoreValues {
    selectedProductTypeGroup?: string;
    selectedProductType?: string;
    selectedProductDesign?: string;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;