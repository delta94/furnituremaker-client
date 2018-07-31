import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { resfulFetcher, restfulStore, ProductDesign, productDesignResources } from '@/restful';
import { CommonStoreValues, CommonStoreProps } from '@/configs';

import { DesignModal } from './product-design-container';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class ProductDesignContainer extends React.Component<CommonStoreProps> {
    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={resfulFetcher}
                store={restfulStore}
                resource={productDesignResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductDesign>(o => o.productType),
                    value: selectedProductType.id
                }]}
                render={(renderProps) => {
                    if (renderProps.data) {
                        return (<DesignModal productDesigns={renderProps.data} />);
                    }
                    return null;
                }}
            />
        );
    }
}