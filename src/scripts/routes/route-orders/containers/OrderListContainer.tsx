import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { orderResources, restfulFetcher, restfulStore } from '@/restful';

import { OrderListControl } from './order-list-container';

export class OrderListContainer extends React.Component {
    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                parameters={[]}
                resource={orderResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return <OrderListControl />;
                    }

                    return null;
                }}
            />
        );
    }
}