import * as React from 'react';

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

import { ProductSence } from './ProductSence';
import { ProductInfo } from './ProductInfo';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

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
                <AntdRow type="flex">
                    <AntdCol span={16}>
                        <ProductSence product={defaultProduct} />
                    </AntdCol>
                    <AntdCol span={8}>
                        <ProductInfo />
                    </AntdCol>
                </AntdRow>
            </Container>
        );
    }
}