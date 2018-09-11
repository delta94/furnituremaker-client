import * as React from 'react';
import { ResourceParameter } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnitureMaterial,
    furnitureMaterialResources,
    Product,
    ProductExtended,
    productUtils,
    restfulFetcher
} from '@/restful';

import {
    InventoryProductInfo,
    InventoryProductPreview
} from './product-detail';

const ProductDetailWrapper = styled.div`
    display: bold;
`;

export interface ProductDetailProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProduct'> {
    readonly product: Product;
}

@withStoreValues<ProductDetailProps>('selectedProduct')
export class ProductDetail extends React.PureComponent<ProductDetailProps> {
    async componentDidMount() {
        const { product, setStore } = this.props;
        const fetchedModules = await productUtils.fetchModules(product.modulesCode);
        setStore<CommonStoreProps>({
            selectedProduct: {
                ...product,
                modules: fetchedModules
            }
        });
    }

    public render() {
        const { selectedProduct } = this.props;

        if (!selectedProduct) {
            return null;
        }

        return (
            <ProductDetailWrapper>
                <AntdRow>
                    <AntdCol span={14}>
                        <InventoryProductPreview />
                    </AntdCol>
                    <AntdCol span={10}>
                        <InventoryProductInfo />
                    </AntdCol>
                </AntdRow>
            </ProductDetailWrapper>
        );
    }
}
