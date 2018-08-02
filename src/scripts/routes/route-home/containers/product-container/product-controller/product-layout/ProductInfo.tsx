import * as React from 'react';
import styled from 'styled-components';
import { RestfulRender } from 'react-restful';

import {
    ThreeMaterialList,
    ThreeComponentList,
    Condition,
    AntdDivider,
    ThreeComponentListProps,
    AntdRow,
    AntdCol
} from '@/components';
import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { CommonStoreProps, Include, colorPrimary } from '@/configs';

import {
    Product,
    productUtils,
    productModuleUtils,
    resfulFetcher,
    restfulStore,
    discountByQuantitiesResources,
    DiscountByQuantities,
    ProductModule
} from '@/restful';

import { colorGray } from '@/configs';
import { AddToCartForm } from './product-info';

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
            <ComponentsInfoWrapper>
                <Condition condition={this.props.selectedObject}>
                    <Condition.Then>
                        <ThreeMaterialList />
                        <ThreeComponentList />
                    </Condition.Then>
                    <Condition.Else>
                        <React.Fragment>
                            <ProductName>{productUtils.getProductName(product)}</ProductName>
                            <AntdDivider />
                            <AntdRow>
                                <AntdCol span={13}>
                                    <ProductDesign>{product.design.name}</ProductDesign>
                                </AntdCol>
                                <AntdCol span={11}>
                                    <ChangeDesign
                                        className="text-right"
                                        onClick={showDesignModal}
                                    >
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
                                <p>Giá ban đầu: {productUtils.formatPrice(product)}</p>
                                <RestfulRender
                                    fetcher={resfulFetcher}
                                    store={restfulStore}
                                    parameters={[{
                                        type: 'query',
                                        parameter: nameof<DiscountByQuantities>(o => o.productType),
                                        value: selectedProductType.id
                                    }]}
                                    resource={discountByQuantitiesResources.find}
                                    render={(renderProps) => {
                                        if (renderProps.data && !renderProps.fetching) {
                                            return (
                                                <AddToCartForm
                                                    discountByQuantities={renderProps.data}
                                                    product={product}
                                                    initialValues={{
                                                        quantity: renderProps.data[0] && renderProps.data[0].quantity
                                                    }}
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
            </ComponentsInfoWrapper>
        );
    }
}