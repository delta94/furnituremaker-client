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
    readonly productId: number;
}

export class ProductContainer extends React.Component<ProductContainerProps> {
    render() {
        const { productId } = this.props;
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'path',
                    parameter: nameof<Product>(o => o.id),
                    value: productId
                }]}
                resource={productResources.findOne}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <ProductDetail
                                product={renderProps.data}
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}
