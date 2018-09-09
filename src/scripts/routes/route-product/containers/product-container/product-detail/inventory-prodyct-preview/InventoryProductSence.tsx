import * as React from 'react';

import { withStoreValues } from '@/app';
import { ThreeSence } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnutureMaterial,
    furnutureMaterialResources,
    ProductExtended,
    ProductModule,
    productUtils,
    restfulFetcher
} from '@/restful';

export interface InventoryProductSenceProps extends
    Pick<CommonStoreProps, 'setStore'> {
    readonly product: CommonStoreProps['selectedProduct'];
}

@withStoreValues<InventoryProductSenceProps>()
export class InventoryProductSence extends React.PureComponent<InventoryProductSenceProps> {
    public render() {
        const { product, setStore } = this.props;
        return (
            <ThreeSence
                onObjectSelect={null}
                selectedObject={null}
                productModules={product.modules}
                productType={product.productType}
                setSence={(threeScreen) => {
                    setStore<CommonStoreProps>({
                        product3Dsence: threeScreen
                    });
                }}
            />
        );
    }
}
