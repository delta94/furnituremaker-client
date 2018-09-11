import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import {
    AntdCol,
    AntdRow,
    Container,
    ThreeComponentListProps,
    ThreeMaterialListProps
} from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponentType,
    productUtils,
    WithMaterialTypesProps
} from '@/restful';

import { ProductInfo, ProductInfoProps, ProductSence } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 30px 0;
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

            props.setStore({
                [nameof<ProductLayoutProps>(o => o.selectedProduct)]: defaultProduct
            });
        }
    }

    render() {
        const { selectedProduct, showDesignModal } = this.props;
        if (!selectedProduct) {
            return null;
        }

        return (
            <Container>
                <ProductLayoutContent>
                    <AntdRow type="flex">
                        <AntdCol span={16}>
                            <ProductSence product={selectedProduct} />
                        </AntdCol>
                        <AntdCol span={8}>
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