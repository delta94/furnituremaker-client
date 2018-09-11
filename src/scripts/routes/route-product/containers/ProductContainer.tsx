import * as React from 'react';
import { RestfulRender } from 'react-restful';

import {
    Product,
    productResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { ProductDetail } from './product-container';

interface ProductContainerProps {
    readonly productCode: number;
}

export class ProductContainer extends React.Component<ProductContainerProps> {
    render() {
        const { productCode } = this.props;
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'query',
                    parameter: nameof<Product>(o => o.produceCode),
                    value: productCode
                }]}
                resource={productResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <ProductDetail
                                product={renderProps.data[0]}
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}
