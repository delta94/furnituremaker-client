import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import {
    productTypeGroupResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { HomeProductTypeGroupController } from './home-product-type-group';

export class HomeProductTypeGroup extends React.PureComponent<CommonStoreProps> {
    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={productTypeGroupResources.find}
                parameters={[]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <HomeProductTypeGroupController productTypeGroups={renderProps.data} />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}