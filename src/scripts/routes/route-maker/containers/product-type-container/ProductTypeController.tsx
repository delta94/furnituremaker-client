import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';

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
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'>,
    Pick<CommonStoreProps, 'leaveProductTypeGroupTimeout'>,
    ProductTypeListStoreProps {
    readonly productTypes: ProductType[];
}

@withStoreValues<ProductTypeContainerProps>(
    'leaveProductTypeGroupTimeout',
    'showProductTypeList'
)
export class ProductTypeController extends React.PureComponent<ProductTypeContainerProps> {

    constructor(props: ProductTypeContainerProps) {
        super(props);
    }

    componentDidUpdate() {
        const {
            showProductTypeList,
            leaveProductTypeGroupTimeout,
            setStore
        } = this.props;

        if (showProductTypeList && leaveProductTypeGroupTimeout) {
            clearTimeout(leaveProductTypeGroupTimeout);
            setStore<ProductTypeContainerProps>({
                leaveProductTypeGroupTimeout: null
            });
        }
    }

    render() {
        const {
            productTypes,
            setStore
        } = this.props;

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
                    setStore<ProductTypeContainerProps>({
                        showProductTypeList: true
                    });
                }
                }
                onMouseLeaveList={() => {
                    setStore<ProductTypeContainerProps>({
                        showProductTypeList: false,
                        hoveredProductTypeGroup: null
                    });
                }}
            />
        );
    }
}