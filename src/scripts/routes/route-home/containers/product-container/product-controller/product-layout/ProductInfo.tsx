import * as React from 'react';
import styled from 'styled-components';
import { RestfulRender } from 'react-restful';

import {
    ThreeMaterialList,
    ThreeComponentList,
    Condition,
    AntdDivider
} from '@/components';
import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { CommonStoreProps } from '@/configs';

import {
    Product,
    productUtils,
    productModuleUtils,
    resfulFetcher,
    restfulStore,
    discountByQuantitiesResources,
    DiscountByQuantities
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

interface RouteHomeProps extends CommonStoreProps, WithStoreValuesDispatchs {
    readonly selectedObject?: THREE.Mesh | null;
    readonly product: Product;
}

@withStoreValues(
    'selectedObject',
    nameof<CommonStoreProps>(o => o.selectedProductType)
)
export class ProductInfo extends React.Component<RouteHomeProps> {
    render() {
        const { product, selectedProductType } = this.props;
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
                            <ProductDesign>{product.design.name}</ProductDesign>
                            <FurnitureModules>
                                {
                                    product.modules.map((module, index) => {
                                        return (
                                            <FurnitureModuleItem key={index}>
                                                {productModuleUtils.getName(module)}
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