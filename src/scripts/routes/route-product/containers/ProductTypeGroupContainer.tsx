import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import {
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
                parameters={[]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <TypeGroupController productTypeGroups={renderProps.data} />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}