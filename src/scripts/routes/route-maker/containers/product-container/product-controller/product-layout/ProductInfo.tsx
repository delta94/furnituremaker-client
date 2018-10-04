import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import {
    AntdCard,
    AntdCol,
    AntdDivider,
    AntdRow,
    ThreeComponentList,
    ThreeComponentListProps,
    ThreeMaterialList
} from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import { AddProductToCartControl } from '@/forms/add-product-to-cart';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    ProductExtended,
    productUtils,
    restfulFetcher
} from '@/restful';

import { ProductTransport, Topbar } from './product-info';

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

const ChangeDesign = styled.div`
    text-align: right;
    cursor: pointer;
    color: ${colorPrimary};
`;

const ProductInfoWrapper = styled.div`
    margin: 0 0 0 0;
    min-height: 500px;
`;

export interface ProductInfoProps extends
    CommonStoreProps,
    WithStoreValuesDispatchs,
    Partial<Pick<ThreeComponentListProps, 'selectedObject'>> {
    readonly product: ProductExtended;
    readonly showDesignModal: () => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ThreeComponentListProps>(o => o.selectedObject)
)
export class ProductInfo extends React.PureComponent<ProductInfoProps> {
    render() {
        const {
            product,
            selectedProductType,
            showDesignModal } = this.props;

        return (
            <React.Fragment>
                <Topbar />
                <AntdCard>
                    {
                        this.props.selectedObject ? (
                            <ProductInfoWrapper>
                                <ThreeMaterialList />
                                <AntdDivider dashed={true} />
                                <ThreeComponentList />
                            </ProductInfoWrapper>
                        ) : (
                                <ProductInfoWrapper>

                                    <AntdRow>
                                        <AntdCol span={13}>
                                            <ProductName>
                                                {productUtils.getProductName(product)}
                                            </ProductName>
                                            <ProductCode>{productUtils.getProductModulesCode(product)}</ProductCode>
                                        </AntdCol>
                                        <AntdCol span={11}>
                                            <ChangeDesign onClick={showDesignModal}>
                                                Thay đổi thiết kế khác?
                                            </ChangeDesign>
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
                            )
                    }
                </AntdCard>
                <div id="xxx" />
            </React.Fragment>
        );
    }
}