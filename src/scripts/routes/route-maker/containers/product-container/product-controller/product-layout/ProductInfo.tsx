import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import {
    AntdCard,
    AntdCol,
    AntdDivider,
    AntdRow,
    Condition,
    ThreeComponentList,
    ThreeComponentListProps,
    ThreeMaterialList
} from '@/components';
import { colorGray, colorPrimary, CommonStoreProps } from '@/configs';
import { AddProductToCartControl } from '@/forms/add-product-to-cart';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    Product,
    productModuleUtils,
    productUtils,
    restfulFetcher,
    restfulStore
} from '@/restful';

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

const ProductDesign = styled.p`
    font-size: 14px;
`;

const ChangeDesign = styled.div`
    text-align: right;
    cursor: pointer;
    color: ${colorPrimary};
`;

const FurnitureModules = styled.div`
    border: 1px solid ${colorGray};
    padding: 15px;
    border-radius: 3px;
`;

const FurnitureModuleItem = styled.div`
    margin: 0 0 10px 0;
    &:last-child {
        margin: 0 0 0 0;
    }
`;

const ProductInfoWrapper = styled.div`
    margin: 0 0 0 0;
    min-height: 500px;
`;

export interface ProductInfoProps extends
    CommonStoreProps,
    WithStoreValuesDispatchs,
    Partial<Pick<ThreeComponentListProps, 'selectedObject'>> {
    readonly product: Product;
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
            showDesignModal
        } = this.props;

        return (
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
                                <ProductName>
                                    {productUtils.getProductName(product)}
                                </ProductName>
                                <ProductCode>{productUtils.getProductCode(product)}</ProductCode>
                                <AntdDivider />
                                <AntdRow>
                                    <AntdCol span={13}>
                                        <ProductDesign>{product.design.name}</ProductDesign>
                                    </AntdCol>
                                    <AntdCol span={11}>
                                        <ChangeDesign onClick={showDesignModal}>
                                            Thay đổi thiết kế khác?
                                        </ChangeDesign>
                                    </AntdCol>
                                </AntdRow>
                                <FurnitureModules>
                                    {
                                        product.modules.map((productModule, index) => {
                                            return (
                                                <FurnitureModuleItem key={index}>
                                                    {productModuleUtils.getName(productModule)}
                                                </FurnitureModuleItem>
                                            );
                                        })
                                    }
                                </FurnitureModules>
                                <AntdDivider />
                                <div>
                                    <div>Giá ban đầu: {productUtils.formatPrice(product)}</div>
                                    <RestfulRender
                                        fetcher={restfulFetcher}
                                        store={restfulStore}
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
        );
    }
}