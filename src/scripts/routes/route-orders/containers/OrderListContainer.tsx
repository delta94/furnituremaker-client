import * as React from 'react';
import { RequestParameter, RestfulRender } from 'react-restful';

import { Auth } from '@/app';
import { policies } from '@/app/policies';
import { Loading } from '@/components';
import { Order, orderResources, restfulFetcher, restfulStore } from '@/restful';

import { OrderListControl } from './order-list-container';

export class OrderListContainer extends React.PureComponent {
    readonly getFetchParams = () => {
        const searchParams = new URLSearchParams(location.search);
        const searchEntries = searchParams.entries();
        const searchs = Array.from(searchEntries);
        return searchs.map((searchEntry): RequestParameter => {
            return {
                type: 'query',
                parameter: searchEntry[0],
                value: searchEntry[1]
            };
        });
    }

    render() {
        const user = Auth.instance.currentUser;
        const fetchParams = policies.canViewAllOrder() ?
            this.getFetchParams() : [
                ...this.getFetchParams(),
                {
                    parameter: nameof<Order>(o => o.agencyOrderer),
                    type: 'query',
                    value: user.agency && user.agency.id
                } as RequestParameter
            ];

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                parameters={fetchParams}
                resource={orderResources.find}
                render={(renderProps) => {
                    if (renderProps.fetching) {
                        return <Loading />;
                    }

                    if (!renderProps.data) {
                        return null;
                    }

                    return <OrderListControl orders={renderProps.data} />;
                }}
            />
        );
    }
}