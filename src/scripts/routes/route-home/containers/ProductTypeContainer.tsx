import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { resfulFetcher, restfulStore, productTypeResources, ProductType } from '@/restful';
import { ProductTypeList } from '@/components';
import { CommonStoreValues, CommonStoreProps } from '@/configs';

import { DesignModalProps } from './product-design-container';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductTypeGroup))
export class ProductTypeContainer extends React.Component<CommonStoreProps> {
    render() {
        const { selectedProductTypeGroup, setStore } = this.props;
        if (!selectedProductTypeGroup) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={resfulFetcher}
                store={restfulStore}
                resource={productTypeResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductType>(o => o.productTypeGroup),
                    value: selectedProductTypeGroup.id
                }]}
                render={(renderProps) => {
                    if (renderProps.data) {
                        return (
                            <ProductTypeList
                                productTypes={renderProps.data}
                                onTypeClick={(productType) =>
                                    setStore({
                                        [nameof<DesignModalProps>(o => o.showDesignsModal)]: true,
                                        [nameof<CommonStoreProps>(o => o.selectedProductType)]: productType
                                    })
                                }
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}