import * as React from 'react';
import styled from 'styled-components';

import {
    AntdRow,
    AntdCol,
    Container,
} from '@/components';
import {
    FurnitureComponentType,
    WithMaterialTypesProps,
    productUtils
} from '@/restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

import { ProductSence, ProductInfo } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 30px 0;
`;

interface ProductLayoutProps extends CommonStoreProps, WithMaterialTypesProps {
    readonly furnitureComponentTypes: FurnitureComponentType[];
}

@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProductType))
export class ProductLayout extends React.PureComponent<ProductLayoutProps> {
    render() {
        const defaultProduct = productUtils.createDefaultProduct(
            this.props.selectedProductDesign,
            this.props.selectedProductType,
            this.props.furnitureComponentTypes,
            this.props.materialTypes
        );

        return (
            <Container>
                <ProductLayoutContent>
                    <AntdRow type="flex">
                        <AntdCol span={16}>
                            <ProductSence product={defaultProduct} />
                        </AntdCol>
                        <AntdCol span={8}>
                            <ProductInfo product={defaultProduct} />
                        </AntdCol>
                    </AntdRow>
                </ProductLayoutContent>
            </Container>
        );
    }
}