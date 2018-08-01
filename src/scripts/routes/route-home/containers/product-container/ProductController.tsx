import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreValues, CommonStoreProps } from '@/configs';
import {
    restfulStore,
    furnitureComponentTypeUtils,
    WithMaterialTypesProps,
    withMaterialTypes,
    FurnitureComponent
} from '@/restful';

import { ProductLayout } from './product-controller';

interface ProductContainerProps extends CommonStoreProps, WithMaterialTypesProps { 
    readonly furnitureComponents: FurnitureComponent[];
}

@withMaterialTypes(restfulStore)
@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductDesign))
export class ProductController extends React.Component<ProductContainerProps> {
    render() {
        const {
            materialTypes,
            selectedProductDesign,
            furnitureComponents
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