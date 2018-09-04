import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductType, productTypeUtils } from '@/restful';

import { DesignModalProps } from '../product-design-container';
import {
    ProductTypeList,
    ProductTypeListStoreProps
} from './product-type-controller';

export {
    ProductTypeListStoreProps
};

interface ProductTypeContainerProps extends
    Pick<CommonStoreProps, 'setStore'>,
    ProductTypeListStoreProps {
    readonly productTypes: ProductType[];
}

@withStoreValues<ProductTypeContainerProps>()
export class ProductTypeController extends React.Component<ProductTypeContainerProps> {

    constructor(props: ProductTypeContainerProps) {
        super(props);
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