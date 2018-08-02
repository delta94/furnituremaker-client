import * as React from 'react';
import styled from 'styled-components';

import {
    AntdRow,
    AntdCol,
    Container,
    ThreeComponentListProps,
    ThreeMaterialListProps,
} from '@/components';
import {
    FurnitureComponentType,
    WithMaterialTypesProps,
    productUtils
} from '@/restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, Include } from '@/configs';

import { ProductSence, ProductInfo, ProductInfoProps } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 30px 0;
`;

interface ProductLayoutProps extends
    CommonStoreProps,
    WithMaterialTypesProps,
    Include<ProductInfoProps, 'showDesignModal'> {
    readonly furnitureComponentTypes: FurnitureComponentType[];
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ProductLayoutProps>(o => o.selectedProduct),
)
export class ProductLayout extends React.PureComponent<ProductLayoutProps> {
    constructor(props: ProductLayoutProps) {
        super(props);

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

    componentWillUnmount() {
        this.props.setStore({
            [nameof<ProductLayoutProps>(o => o.selectedProduct)]: null,
            [nameof<ThreeComponentListProps>(o => o.selectedObject)]: null,
            [nameof<ThreeMaterialListProps>(o => o.selectedMaterial)]: null,
        });
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