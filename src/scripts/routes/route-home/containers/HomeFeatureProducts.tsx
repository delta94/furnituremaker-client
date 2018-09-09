import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    Product,
    productResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { HomeFeatureProductsController } from './home-feature-products';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class HomeFeatureProducts extends React.PureComponent<CommonStoreProps> {
    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={productResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<Product>(o => o.isFeatureProduct),
                    value: true
                }]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <HomeFeatureProductsController
                                products={renderProps.data}
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}