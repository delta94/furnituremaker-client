import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow, Container } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponentType,
    productUtils,
    WithMaterialProps,
    withMaterials,
    WithMaterialTypesProps
} from '@/restful';
import {
    ProductDetailSectionLablel
} from '@/routes/desktop/route-product/containers/product-container';
import {
    InventoryProductPhotos,
    ProductTypeInfo
} from '@/routes/desktop/route-product/containers/product-container/product-detail';

import { ProductInfo, ProductInfoProps, ProductSence } from './product-layout';

const ProductLayoutContent = styled.div`
    padding: 0;
    margin-bottom: 30px;
`;

interface ProductLayoutProps extends
    CommonStoreProps,
    WithMaterialTypesProps,
    WithMaterialProps,
    Pick<ProductInfoProps, 'showDesignModal'> {
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
        const { selectedProduct, showDesignModal } = this.props;
        if (!selectedProduct) {
            return null;
        }

        return (
            <Container id="senceContainer">
                <ProductLayoutContent>
                    <AntdRow type="flex" style={{ marginBottom: 60 }}>
                        <AntdCol span={15}>
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
                    <ProductDetailSectionLablel>
                        Xem thông số kỹ thuật
                    </ProductDetailSectionLablel>
                    <ProductTypeInfo />
                    <InventoryProductPhotos />
                </ProductLayoutContent>
            </Container>
        );
    }
}