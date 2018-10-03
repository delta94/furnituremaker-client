import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Product, productResources, restfulFetcher } from '@/restful';

import { ProductDetail } from './product-container';

interface ProductContainerProps {
    readonly productCode: number;
}

export class ProductContainer extends React.Component<ProductContainerProps> {
    render() {
        const { productCode } = this.props;
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'query',
                    parameter: nameof<Product>(o => o.produceCode),
                    value: productCode
                }]}
                resource={productResources.find}
                render={this.renderProductDetail}
            />
        );
    }

    readonly renderProductDetail = (renderProps) => {
        if (!renderProps.data) {
            return null;
        }

        return (
            <ProductDetail
                product={renderProps.data[0]}
            />
        );
    }
}
