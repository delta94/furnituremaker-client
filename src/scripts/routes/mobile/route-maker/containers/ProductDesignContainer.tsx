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

import { ProductDesignController } from './product-design-container';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class ProductDesignContainer extends React.Component<CommonStoreProps> {
    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={productDesignResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductDesign>(o => o.productType),
                    value: selectedProductType.id
                }]}
                render={(renderProps) => {
                    if (!renderProps.data) {
                        return null;
                    }
                    
                    return (<ProductDesignController productDesigns={renderProps.data} />);
                }}
            />
        );
    }
}