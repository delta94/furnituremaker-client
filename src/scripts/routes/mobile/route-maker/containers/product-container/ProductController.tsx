import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentTypeUtils,
    withMaterialTypes,
    WithMaterialTypesProps
} from '@/restful';

import { ProductLayout } from './product-controller';

interface ProductContainerProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProductDesign'>,
    WithMaterialTypesProps {
    readonly furnitureComponents: FurnitureComponent[];
}

@withMaterialTypes()
@withStoreValues<ProductContainerProps>('selectedProductDesign')
export class ProductController extends React.PureComponent<ProductContainerProps> {
    render() {
        const {
            materialTypes,
            selectedProductDesign,
            furnitureComponents,
            setStore
        } = this.props;

        if (!selectedProductDesign) {
            return null;
        }

        const furnitureComponentTypes =
            furnitureComponentTypeUtils.fromFurnitureComponents(furnitureComponents);

        return (
            <ProductLayout
                furnitureComponentTypes={furnitureComponentTypes}
                materialTypes={materialTypes}
                selectedProductDesign={selectedProductDesign}
            />
        );
    }
}