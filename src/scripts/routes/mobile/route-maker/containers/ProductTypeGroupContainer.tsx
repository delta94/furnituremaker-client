import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import {
    ProductDesignGroup,
    productTypeGroupResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { TypeGroupController } from './product-type-group-container';

export class ProductTypeGroupContainer extends React.Component<CommonStoreProps> {
    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={productTypeGroupResources.find}
                render={(renderProps) => {
                    if (!renderProps.data) {
                        return null;
                    }

                    return (
                        <TypeGroupController productTypeGroups={renderProps.data} />
                    );
                }}
            />
        );
    }
}