import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { policies } from '@/app/policies';
import {
    Order,
    orderResources,
    restfulFetcher,
    restfulStore,
    withCurrentUser,
    WithCurrentUserProps
} from '@/restful';

import { OrderListControl } from './order-list-container';

@withCurrentUser()
export class OrderListContainer extends React.PureComponent<WithCurrentUserProps> {
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
        const { user } = this.props;

        const fetchParams = policies.canViewAllOrder() ?
            this.getFetchParams() : [
                ...this.getFetchParams(),
                {
                    parameter: nameof<Order>(o => o.agencyOrderer),
                    type: 'query',
                    value: user.agency && user.agency.id
                } as ResourceParameter
            ];

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