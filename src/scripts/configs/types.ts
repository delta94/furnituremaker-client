import { History } from 'history';
import { RouteComponentProps } from 'react-router';

import { ExtendWithStoreValuesProps } from '@/app';
import { ThreeSence } from '@/components';
import { AppNotification } from '@/firebase/firebaseNotificationDB';
import {
    City,
    FurnitureComponent,
    MaterialType,
    Product,
    ProductDesign,
    ProductDesignGroup,
    ProductType,
    ProductTypeGroup,
    Promotion
} from '@/restful';

export interface InitAppStoreProps {
    readonly history?: History;
    readonly notifications?: Map<string, AppNotification>;
}

export interface CommonStoreValues extends InitAppStoreProps {
    readonly appState?: 'PENDING' | 'READY';
    readonly hoveredProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductType?: ProductType;
    readonly selectedProductDesignGroup?: ProductDesignGroup;
    readonly selectedProductDesign?: ProductDesign;
    readonly selectedMaterialType?: MaterialType;
    readonly selectedProduct?: Product;
    readonly selectedPromotion?: Promotion;
    readonly selectedComponent?: FurnitureComponent;

    readonly getCurrentRouteProps?: <T>() => RouteComponentProps<T>;

    readonly drawerVisible?: boolean;
    readonly product3Dsence?: ThreeSence;

    readonly orderFormSelectedCity?: City;
    readonly orderFormStatus?: 'default' | 'submitting' | 'submitSucceeded' | 'submitFailed';
    readonly submitOrderForm?: () => void;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;