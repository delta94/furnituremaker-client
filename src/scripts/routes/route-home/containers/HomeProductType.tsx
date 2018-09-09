import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    ProductType,
    productTypeResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { ProductTypeController } from './home-product-type';

@withStoreValues(nameof<CommonStoreValues>(o => o.hoveredProductTypeGroup))
export class HomeProductType extends React.PureComponent<CommonStoreProps> {
    render() {
        const { hoveredProductTypeGroup } = this.props;
        if (!hoveredProductTypeGroup) {
            return null;
        }

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={productTypeResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductType>(o => o.productTypeGroup),
                    value: hoveredProductTypeGroup.id
                }]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <ProductTypeController productTypes={renderProps.data} />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}