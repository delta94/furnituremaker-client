import * as React from 'react';
import { ResourceParameter } from 'react-restful';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnitureMaterial,
    furnitureMaterialResources,
    Product,
    ProductExtended,
    productUtils,
    restfulFetcher
} from '@/restful';

import {
    InventoryProductInfo,
    InventoryProductPreview
} from './product-detail';

const ProductDetailWrapper = styled.div`
    display: bold;
`;

export interface ProductDetailProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProduct'> {
    readonly product: Product;
}

@withStoreValues<ProductDetailProps>('selectedProduct')
export class ProductDetail extends React.PureComponent<ProductDetailProps> {
    async componentDidMount() {
        const { product, setStore } = this.props;
        const fetchedModules = await this.fetchModules(product);
        setStore<CommonStoreProps>({
            selectedProduct: {
                ...product,
                modules: fetchedModules
            }
        });
    }

    readonly fetchModules = async (product: Product) => {
        const componentCodes = productUtils.getComponentCodes(product.modulesCode);
        const materialCodes = productUtils.getMaterialCodes(product.modulesCode);

        const componentParamsFetchList = componentCodes.map((code): ResourceParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureComponent>(o => o.code),
                value: code
            };
        });

        const materialParamsFetchList = materialCodes.map((code): ResourceParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureMaterial>(o => o.code),
                value: code
            };
        });

        const componentsMaterials = await Promise.all([
            Promise.all<FurnitureComponent[]>(componentParamsFetchList.map((param) =>
                restfulFetcher.fetchResource(
                    furnitureComponentResources.find,
                    [param]
                )
            )),
            Promise.all<FurnitureMaterial[]>(materialParamsFetchList.map((param) =>
                restfulFetcher.fetchResource(
                    furnitureMaterialResources.find,
                    [param]
                )
            ))
        ]);

        const componentList = componentsMaterials[0];
        const materialList = componentsMaterials[1];

        const modules = componentList.map((component, index) =>
            productUtils.createModule(component[0], materialList[index][0])
        );

        return modules;
    }

    public render() {
        const { selectedProduct } = this.props;

        if (!selectedProduct) {
            return null;
        }

        return (
            <ProductDetailWrapper>
                <AntdRow>
                    <AntdCol span={14}>
                        <InventoryProductPreview />
                    </AntdCol>
                    <AntdCol span={10}>
                        <InventoryProductInfo />
                    </AntdCol>
                </AntdRow>
            </ProductDetailWrapper>
        );
    }
}
