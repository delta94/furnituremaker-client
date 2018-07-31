import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { resfulFetcher, restfulStore, productTypeResources, ProductType } from '@/restful';
import { ProductTypeList } from '@/components';
import { CommonStoreValues, CommonStoreProps } from '@/configs';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductTypeGroup))
export class ProductTypeContainer extends React.Component<CommonStoreProps> {
    render() {
        const { selectedProductTypeGroup } = this.props;
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
                render={ProductTypeList}
            />
        );
    }
}