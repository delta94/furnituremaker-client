import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import {
    AntdCard,
    AntdCol,
    AntdCollapse,
    AntdDivider,
    AntdIcon,
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

const ProductInfoWrapper = styled.div`
    margin: 0 0 0 0;
    min-height: 500px;
`;

const ProductBackBtn = styled.div`
    font-size: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
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
            showDesignModal,
            setStore
        } = this.props;

        return (
            <AntdCard>
                {
                    this.props.selectedObject ? (
                        <ProductInfoWrapper>
                            <ProductBackBtn
                                onClick={() => setStore({ selectedObject: null })}
                            >
                                <AntdIcon type="arrow-left" />
                            </ProductBackBtn>
                            <ThreeMaterialList />
                            <AntdDivider dashed={true} />
                            <ThreeComponentList />
                        </ProductInfoWrapper>
                    ) : (
                            <ProductInfoWrapper>
                                <ProductName>
                                    {productUtils.getProductName(product)}
                                </ProductName>
                                <ProductCode>{productUtils.getProductModulesCode(product)}</ProductCode>
                                <AntdDivider dashed={true} />
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
                                <AntdCollapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    style={{ margin: '0 -24px 20px -24px' }}
                                >
                                    <AntdCollapse.Panel
                                        key="1"
                                        header="Thông ting chung"
                                        style={{
                                            padding: '0 10px'
                                        }}
                                    >
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Fusce at dolor magna.
                                                Maecenas eros justo, tempus eget massa sit amet, ullamcorper molestie ex
                                        </p>
                                    </AntdCollapse.Panel>
                                    <AntdCollapse.Panel
                                        key="2"
                                        header="Thông số sản phẩm"
                                        style={{
                                            padding: '0 10px'
                                        }}
                                    >
                                        <AntdRow>
                                            <AntdCol span={12}>
                                                Kích thước:
                                            </AntdCol>
                                            <AntdCol span={12}>
                                                <div style={{ textAlign: 'right' }}>
                                                    {product.productType.size}
                                                </div>
                                            </AntdCol>
                                            <AntdCol span={12}>
                                                Thể tích:
                                            </AntdCol>
                                            <AntdCol span={12}>
                                                <div style={{ textAlign: 'right' }}>
                                                    {product.productType.volume} m<sup>3</sup>
                                                </div>
                                            </AntdCol>
                                        </AntdRow>
                                    </AntdCollapse.Panel>
                                </AntdCollapse>
                                <div>
                                    <h4>Thêm vào giỏ hàng</h4>
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