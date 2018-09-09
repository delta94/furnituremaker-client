import * as React from 'react';
import styled from 'styled-components';

import { AntdDivider } from '@/components';
import { Product } from '@/restful';

const ProductName = styled.h1`
    line-height: 24px;
    font-size: 20px;
    color: #3D3D3D;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export interface HomeProductInfoProps {
    readonly product: Product;
}

export class HomeProductInfo extends React.PureComponent<HomeProductInfoProps> {
    public render() {
        const { product } = this.props;

        return (
            <div>
                <ProductName>
                    {product.name}
                </ProductName>
                <span>
                    Mã sản phẩm: {product.produceCode}
                </span>
                <AntdDivider />
            </div>
        );
    }
}
