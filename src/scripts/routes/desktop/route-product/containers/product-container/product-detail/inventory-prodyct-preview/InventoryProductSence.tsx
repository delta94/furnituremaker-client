import * as React from 'react';

import { withStoreValues } from '@/app';
import { ThreeSence } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnitureMaterial,
    furnitureMaterialResources,
    ProductExtended,
    ProductModule,
    productUtils,
    restfulFetcher
} from '@/restful';

export interface InventoryProductSenceProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProductType'> {
    readonly product: CommonStoreProps['selectedProduct'];
}

@withStoreValues<InventoryProductSenceProps>('selectedProductType')
export class InventoryProductSence extends React.PureComponent<InventoryProductSenceProps> {
    public render() {
        const { product, selectedProductType, setStore } = this.props;
        return (
            <ThreeSence
                onObjectSelect={null}
                selectedObject={null}
                productModules={product.modules}
                productType={selectedProductType}
                setSence={(threeScreen) => {
                    setStore<CommonStoreProps>({
                        product3Dsence: threeScreen
                    });
                }}
            />
        );
    }
}
