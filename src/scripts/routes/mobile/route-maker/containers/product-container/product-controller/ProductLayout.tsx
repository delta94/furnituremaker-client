import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponentType,
    productUtils,
    WithMaterialProps,
    withMaterials,
    WithMaterialTypesProps
} from '@/restful';

import { ProductInfo, ProductSence } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 0;
`;

interface ProductLayoutProps extends
    CommonStoreProps,
    WithMaterialTypesProps,
    WithMaterialProps {
    readonly furnitureComponentTypes: FurnitureComponentType[];
}

@withMaterials()
@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ProductLayoutProps>(o => o.selectedProduct)
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
                props.materials
            ); 

            const selectedComponentGroup = productUtils.getComponentGroup(defaultProduct);

            props.setStore<ProductLayoutProps>({
                selectedProduct: defaultProduct,
                selectedComponentGroup: selectedComponentGroup
            });
        }
    }

    render() {
        const { selectedProduct } = this.props;
        if (!selectedProduct) {
            return null;
        }

        return (
            <Container id="senceContainer">
                <ProductLayoutContent>
                    <ProductSence
                        product={selectedProduct}
                    />
                    <ProductInfo product={selectedProduct} />
                </ProductLayoutContent>
            </Container>
        );
    }
}