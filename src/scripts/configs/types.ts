import { RouteComponentProps } from 'react-router';

import { ExtendWithStoreValuesProps } from '@/app';
import { ThreeSence } from '@/components';
import {
    MaterialType,
    Product,
    ProductDesign,
    ProductDesignGroup,
    ProductType,
    ProductTypeGroup,
    Promotion
} from '@/restful';

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
    readonly selectedPromotion?: Promotion;
    readonly getCurrentRouteProps?: <T>() => RouteComponentProps<T>;

    readonly drawerVisible?: boolean;
    readonly product3Dsence?: ThreeSence;

    readonly orderFormStatus?: 'default' | 'submitting' | 'submitSucceeded' | 'submitFailed';
    readonly submitOrderForm?: () => void;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;