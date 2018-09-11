import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentTypeUtils,
    restfulStore,
    withMaterialTypes,
    WithMaterialTypesProps
} from '@/restful';

import { DesignModalProps } from '../product-design-container';
import { ProductLayout } from './product-controller';

interface ProductContainerProps extends CommonStoreProps, WithMaterialTypesProps {
    readonly furnitureComponents: FurnitureComponent[];
}

@withMaterialTypes()
@withStoreValues<CommonStoreValues>('selectedProductDesign')
export class ProductController extends React.Component<ProductContainerProps> {
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
                showDesignModal={() => {
                    setStore({
                        [nameof<DesignModalProps>(o => o.showDesignsModal)]: true
                    });
                }}
            />
        );
    }
}