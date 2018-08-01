import * as React from 'react';

import { withStoreValues } from '@/app';
import { ProductType, productTypeUtils } from '@/restful';
import { CommonStoreProps } from '@/configs';

import { DesignModalProps } from '../product-design-container';
import { ProductTypeList, ProductTypeListStoreProps } from './product-type-controller';

export {
    ProductTypeListStoreProps
};

interface ProductTypeContainerProps extends CommonStoreProps, ProductTypeListStoreProps {
    readonly productTypes: ProductType[];
}

@withStoreValues()
export class ProductTypeController extends React.Component<ProductTypeContainerProps> {

    constructor(props: ProductTypeContainerProps) {
        super(props);
        const { productTypes, setStore, checkStore } = props;

        // * Set default product type
        checkStore<ProductType>(nameof<CommonStoreProps>(o => o.selectedProductType)).then(
            (selectedProductType) => {
                if (!selectedProductType) {
                    const defaulType = productTypeUtils.getDefaultProductType(productTypes);
                    setStore({
                        [nameof<CommonStoreProps>(o => o.selectedProductType)]: defaulType
                    });
                }
            });
    }

    render() {
        const { productTypes, setStore } = this.props;

        return (
            <ProductTypeList
                productTypes={productTypes}
                onTypeClick={(productType) => {
                    setStore({
                        [nameof<DesignModalProps>(o => o.showDesignsModal)]: true,
                        [nameof<CommonStoreProps>(o => o.selectedProductType)]: productType
                    });
                }}
                onMouseHoverOnList={() => {
                    setStore({
                        [nameof<ProductTypeListStoreProps>(o => o.showProductTypeList)]: true
                    });
                }
                }
                onMouseLeaveList={() => {
                    setStore({
                        [nameof<ProductTypeListStoreProps>(o => o.showProductTypeList)]: false
                    });
                }}
            />
        );
    }
}