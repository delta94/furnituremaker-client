import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';

import {
    HomeProductTypeList,
    HomeProductTypeListStoreProps
} from './home-product-type-controller';

export {
    HomeProductTypeListStoreProps
};

interface HomeProductTypeContainerProps extends
    Pick<CommonStoreProps, 'setStore'>,
    HomeProductTypeListStoreProps {
    readonly productTypes: ProductType[];
}

@withStoreValues<HomeProductTypeContainerProps>()
export class ProductTypeController extends React.Component<HomeProductTypeContainerProps> {

    constructor(props: HomeProductTypeContainerProps) {
        super(props);
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
                    setStore<HomeProductTypeListStoreProps>({
                        showHomeProductTypeList: false
                    });
                }}
            />
        );
    }
}