import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { orderResources, restfulFetcher, restfulStore } from '@/restful';

import { OrderListControl } from './order-list-container';

export class OrderListContainer extends React.Component {
    readonly getFetchParams = () => {
        const searchParams = new URLSearchParams(location.search);
        const searchEntries = searchParams.entries();
        const searchs = Array.from(searchEntries);
        return searchs.map((searchEntry): ResourceParameter => {
            return {
                type: 'query',
                parameter: searchEntry[0],
                value: searchEntry[1]
            };
        });
    }

    render() {
        const fetchParams = this.getFetchParams();
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                parameters={fetchParams}
                resource={orderResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return <OrderListControl orders={renderProps.data} />;
                    }

                    return null;
                }}
            />
        );
    }
}