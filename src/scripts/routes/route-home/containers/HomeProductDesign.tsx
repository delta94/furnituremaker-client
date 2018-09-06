import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    ProductDesign,
    productDesignResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { HomeProductDesignController } from './home-product-design';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class HomeProductDesign extends React.PureComponent<CommonStoreProps> {
    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={productDesignResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductDesign>(o => o.productType),
                    value: selectedProductType.id
                }]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (<HomeProductDesignController productDesigns={renderProps.data} />);
                    }
                    return null;
                }}
            />
        );
    }
}