import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import {
    AntdCol,
    AntdDivider,
    AntdRow,
    ThreeComponentListProps
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { AddProductToCartControl } from '@/forms/add-product-to-cart';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    ProductExtended,
    productUtils,
    restfulFetcher
} from '@/restful';

import { ProductTransport } from './product-info';

const ProductInfoCardHoler = styled.div`
    > div {
        transition: none;
    }
`;

const ProductName = styled.h1`
    margin-bottom: 0px;
    font-size: 18px;
`;

const ProductCode = styled.small`
    font-size: 12px;
    color: darkgray;
    font-weight: 400;
    line-height: 1;
`;

const ProductInfoWrapper = styled.div`
    margin: 0 0 0 0;
    padding: 0 10px 40px 10px;
    min-height: 500px;
`;

export interface ProductInfoProps extends
    CommonStoreProps,
    WithStoreValuesDispatchs,
    Partial<Pick<ThreeComponentListProps, 'selectedObject'>> {
    readonly product: ProductExtended;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ThreeComponentListProps>(o => o.selectedObject)
)
export class ProductInfo extends React.PureComponent<ProductInfoProps> {
    componentWillUnmount() {
        this.props.setStore({
            selectedObject: null
        });
    }

    render() {
        const {
            product,
            selectedProductType
        } = this.props;

        return (
            <ProductInfoCardHoler id="productInfoCardHoler">
                <ProductInfoWrapper>
                    <AntdRow>
                        <AntdCol span={13}>
                            <ProductName>
                                {productUtils.getProductName(product)}
                            </ProductName>
                            <ProductCode>
                                {productUtils.getProductModulesCode(product)}
                            </ProductCode>
                        </AntdCol>
                    </AntdRow>
                    <AntdDivider />
                    <ProductTransport />
                    <AntdDivider />
                    <div>
                        <h4>Thêm vào giỏ hàng</h4>
                        <RestfulRender
                            fetcher={restfulFetcher}
                            parameters={[{
                                type: 'query',
                                parameter: nameof<DiscountByQuantity>(o => o.productType),
                                value: selectedProductType.id
                            }]}
                            resource={discountByQuantitiesResources.find}
                            render={(renderProps) => {
                                if (renderProps.data && !renderProps.fetching) {
                                    return (
                                        <AddProductToCartControl
                                            discountByQuantities={renderProps.data}
                                        />
                                    );
                                }
                                return null;
                            }}
                        />
                    </div>
                </ProductInfoWrapper>
            </ProductInfoCardHoler>
        );
    }
}