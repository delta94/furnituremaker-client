import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';

import {
    HomeProductTypeList,
    HomeProductTypeListStoreProps
} from './home-product-type-controller';

interface HomeProductTypeContainerProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'>,
    Pick<CommonStoreProps, 'leaveProductTypeGroupTimeout'>,
    HomeProductTypeListStoreProps {
    readonly productTypes: ProductType[];
}

@withStoreValues<HomeProductTypeContainerProps>(
    'leaveProductTypeGroupTimeout',
    'showHomeProductTypeList'
)
export class ProductTypeController extends React.Component<HomeProductTypeContainerProps> {

    constructor(props: HomeProductTypeContainerProps) {
        super(props);
    }

    componentDidUpdate() {
        const {
            showHomeProductTypeList,
            leaveProductTypeGroupTimeout,
            setStore
        } = this.props;

        if (showHomeProductTypeList && leaveProductTypeGroupTimeout) {
            clearTimeout(leaveProductTypeGroupTimeout);
            setStore<HomeProductTypeContainerProps>({
                leaveProductTypeGroupTimeout: null
            });
        }
    }
    
    render() {
        const { productTypes, setStore } = this.props;

        return (
            <HomeProductTypeList
                productTypes={productTypes}
                onTypeClick={(productType) => {
                    setStore<CommonStoreProps>({
                        selectedProductType: productType
                    });
                }}
                onMouseHoverOnList={() => {
                    setStore<HomeProductTypeListStoreProps>({
                        showHomeProductTypeList: true
                    });
                }
                }
                onMouseLeaveList={() => {
                    setStore<HomeProductTypeContainerProps>({
                        showHomeProductTypeList: false,
                        hoveredProductTypeGroup: null
                    });
                }}
            />
        );
    }
}