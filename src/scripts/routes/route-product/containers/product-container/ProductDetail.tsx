import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdRow } from '@/components';
import { Product } from '@/restful';

import { HomeProductInfo, HomeProductPreview } from './product-detail';

const ProductDetailWrapper = styled.div`
    display: bold;
`;

export interface ProductDetailProps {
    readonly product: Product;
}

export class ProductDetail extends React.PureComponent<ProductDetailProps> {
    public render() {
        const { product } = this.props;
        return (
            <ProductDetailWrapper>
                <AntdRow>
                    <AntdCol span={12}>
                        <HomeProductPreview product={product} />
                    </AntdCol>
                    <AntdCol span={12}>
                        <HomeProductInfo product={product} />
                    </AntdCol>
                </AntdRow>
            </ProductDetailWrapper>
        );
    }
}
