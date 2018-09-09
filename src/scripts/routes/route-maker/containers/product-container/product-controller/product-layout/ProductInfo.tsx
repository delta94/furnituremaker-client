import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import {
    AntdCard,
    AntdCol,
    AntdDivider,
    AntdIcon,
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
    ProductExtended,
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
                                <ProductCode>{productUtils.getProductModuleCode(product)}</ProductCode>
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
                                <div style={{ margin: '0 0 15px 0' }}>
                                    <h4>Cấu kiện và vật liệu</h4>
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
                                </div>
                                <AntdRow>
                                    <AntdCol span={24}>
                                        <h4>Thông số sản phẩm</h4>
                                    </AntdCol>
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
                                <AntdDivider />
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