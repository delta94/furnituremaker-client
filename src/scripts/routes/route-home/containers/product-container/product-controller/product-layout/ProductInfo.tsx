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
import { colorGray, colorPrimary, CommonStoreProps, Include } from '@/configs';
import { AddProductToCartControl } from '@/forms/add-product-to-cart';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    Product,
    productModuleUtils,
    productUtils,
    resfulFetcher,
    restfulStore
} from '@/restful';

const ComponentsInfoWrapper = styled.div`
    border: 1px solid #DADADA;
    background: #fff; 
    padding: 30px;
    overflow: auto;
`;

const ProductName = styled.h1`
    font-size: 18px;
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

export interface ProductInfoProps extends
    CommonStoreProps,
    WithStoreValuesDispatchs,
    Partial<Include<ThreeComponentListProps, 'selectedObject'>> {
    readonly product: Product;
    readonly showDesignModal: () => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ThreeComponentListProps>(o => o.selectedObject)
)
export class ProductInfo extends React.Component<ProductInfoProps> {
    render() {
        const {
            product,
            selectedProductType,
            showDesignModal
        } = this.props;

        return (
            <AntdCard>
                <Condition condition={this.props.selectedObject}>
                    <Condition.Then>
                        <ThreeMaterialList />
                        <AntdDivider />
                        <ThreeComponentList />
                    </Condition.Then>
                    <Condition.Else>
                        <React.Fragment>
                            <ProductName>
                                {productUtils.getProductName(product)}<br />
                                <small>{productUtils.getProductCode(product)}</small>
                            </ProductName>
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
                                    fetcher={resfulFetcher}
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
                        </React.Fragment>
                    </Condition.Else>
                </Condition>
            </AntdCard>
        );
    }
}