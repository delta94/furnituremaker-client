import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { resfulFetcher, restfulStore, productTypeResources, ProductType } from '@/restful';
import { CommonStoreValues, CommonStoreProps } from '@/configs';

import { ProductTypeController } from './product-type-container';

@withStoreValues(nameof<CommonStoreValues>(o => o.hoveredProductTypeGroup))
export class ProductTypeContainer extends React.Component<CommonStoreProps> {
    render() {
        const { hoveredProductTypeGroup } = this.props;
        if (!hoveredProductTypeGroup) {
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