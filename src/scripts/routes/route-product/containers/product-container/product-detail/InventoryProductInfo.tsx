import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdDivider, AntdTag } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    ProductDiscount,
    productDiscountUtils,
    withProductDiscounts,
    WithProductDiscounts
} from '@/restful';
import { formatCurrency } from '@/utilities';

import {
    InventoryProductAddToCart,
    InventoryProductTransport
} from './inventory-product-info';

const ProductName = styled.h1`
    line-height: 24px;
    font-size: 20px;
    color: #3D3D3D;
`;

const ProductCode = styled.span`
    color:#536AB1;
    text-transform: uppercase;
    font-size: 120%;
`;

export interface InventoryProductInfoProps extends
    Pick<CommonStoreProps, 'selectedProduct'>,
    WithProductDiscounts {
}

@withProductDiscounts()
@withStoreValues<InventoryProductInfoProps>('selectedProduct')
export class InventoryProductInfo extends React.PureComponent<InventoryProductInfoProps> {
    readonly getDiscountLabel = (productDiscount: ProductDiscount) => {
        if (productDiscount.discountPercent) {
            return (
                <AntdTag color="green">
                    giảm giá 30%
                </AntdTag>
            );
        }

        return (
            <AntdTag color="green">
                giảm {formatCurrency(productDiscount.discountMoney)}
            </AntdTag>
        );
    }
    public render() {
        const { selectedProduct, productDiscounts } = this.props;
        const productDiscount =
            productDiscountUtils.getDiscountByProduct(productDiscounts, selectedProduct);
        return (
            <div>
                <ProductName>
                    {selectedProduct.name}
                    {
                        productDiscount && (
                            <React.Fragment>
                                <AntdDivider type="vertical" />
                                {this.getDiscountLabel(productDiscount)}
                            </React.Fragment>
                        )
                    }
                </ProductName>
                <p>
                    Mã sản phẩm: <ProductCode>{selectedProduct.produceCode}</ProductCode>
                </p>
                <AntdDivider />
                <InventoryProductTransport
                    product={selectedProduct}
                />
                <AntdDivider />
                <InventoryProductAddToCart
                    productDiscount={productDiscount}
                />
            </div>
        );
    }
}