import { History } from 'history';

import { ExtendWithStoreValuesProps } from '@/app';
import { ThreeSence } from '@/components';
import { AppNotification } from '@/firebase/firebaseNotificationDB';
import {
    City,
    ComponentGroup,
    FurnitureComponent,
    MaterialType,
    ProductDesign,
    ProductDesignGroup,
    ProductExtended,
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
    readonly leaveProductTypeGroupTimeout?: number ;

    readonly allComponents?: FurnitureComponent[];

    readonly selectedProductTypeGroup?: ProductTypeGroup;
    readonly selectedProductType?: ProductType;
    readonly selectedProductDesignGroup?: ProductDesignGroup;
    readonly selectedProductDesign?: ProductDesign;
    readonly selectedMaterialType?: MaterialType;
    readonly selectedProduct?: ProductExtended;
    readonly selectedPromotion?: Promotion;
    readonly selectedComponent?: FurnitureComponent;
    readonly selectedComponentGroup?: ComponentGroup;
    readonly selectedComponentHeight?: string;
    readonly selectedComponentDiameter?: string;
    
    readonly drawerVisible?: boolean;
    readonly product3Dsence?: ThreeSence;

    readonly orderFormSelectedCity?: City;
    readonly orderFormStatus?: 'default' | 'submitting' | 'submitSucceeded' | 'submitFailed';
    readonly submitOrderForm?: () => void;

    readonly cartAddressBookVisibleToggle?: () => void;
    readonly drawerVisibled?: boolean;
}

export type CommonStoreProps = ExtendWithStoreValuesProps<CommonStoreValues>;