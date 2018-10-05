import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';
import { Product, productUtils } from '@/restful';

import {
    InventoryProductInfo,
    InventoryProductPhotos,
    InventoryProductPreview,
    ProductTypeInfo
} from './product-detail';

const ProductDetailWrapper = styled.div`
    display: bold;
`;

export const ProductDetailSectionLablel: React.ComponentType<React.CSSProperties> = styled.p`
    background: #D6D6D6;
    height: 49px;
    line-height: 49px;
    text-transform: uppercase;
    font-size: 14px;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;

    color: #141414;
    margin-top: ${((props: React.CSSProperties) => props.marginTop)}px;
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
                <AntdRow type="flex">
                    <AntdCol span={16}>
                        <InventoryProductPreview />
                    </AntdCol>
                    <AntdCol span={8}>
                        <InventoryProductInfo />
                    </AntdCol>
                </AntdRow>
                <ProductDetailSectionLablel>
                    Xem thông số kỹ thuật
                </ProductDetailSectionLablel>
                <ProductTypeInfo />
                <InventoryProductPhotos />
            </ProductDetailWrapper>
        );
    }
}
