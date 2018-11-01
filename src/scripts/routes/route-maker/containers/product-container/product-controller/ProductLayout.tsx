import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow, Container } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponentType,
    productUtils,
    WithMaterialTypesProps
} from '@/restful';

import { ProductInfo, ProductInfoProps, ProductSence } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 0;
`;

interface ProductLayoutProps extends
    CommonStoreProps,
    WithMaterialTypesProps,
    Pick<ProductInfoProps, 'showDesignModal'> {
    readonly furnitureComponentTypes: FurnitureComponentType[];
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ProductLayoutProps>(o => o.selectedProduct),
)
export class ProductLayout extends React.PureComponent<ProductLayoutProps> {
    constructor(props: ProductLayoutProps) {
        super(props);
        const { selectedProduct } = this.props;
        if (!selectedProduct) {
            const defaultProduct = productUtils.createDefaultProduct(
                props.selectedProductDesign,
                props.selectedProductType,
                props.furnitureComponentTypes,
                props.materialTypes
            );

            const selectedComponentGroup = productUtils.getComponentGroup(defaultProduct);

            props.setStore<ProductLayoutProps>({
                selectedProduct: defaultProduct,
                selectedComponentGroup: selectedComponentGroup
            });
        }
    }

    render() {
        const { selectedProduct, showDesignModal } = this.props;
        if (!selectedProduct) {
            return null;
        }

        return (
            <Container id="senceContainer">
                <ProductLayoutContent>
                    <AntdRow type="flex">
                        <AntdCol span={15} className="product-info-col">
                            <ProductSence
                                product={selectedProduct}
                            />
                        </AntdCol>
                        <AntdCol span={9}>
                            <ProductInfo
                                product={selectedProduct}
                                showDesignModal={showDesignModal}
                            />
                        </AntdCol>
                    </AntdRow>
                </ProductLayoutContent>
            </Container>
        );
    }
}