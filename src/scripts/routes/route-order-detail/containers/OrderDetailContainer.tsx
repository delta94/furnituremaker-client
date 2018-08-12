import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { orderResources, restfulFetcher, restfulStore } from '@/restful';

import { OrderDetailControl } from './order-detail-container';

interface OrderDetailContainerProps {
    readonly orderId: string;
}

export class OrderDetailContainer extends React.Component<OrderDetailContainerProps> {
    render() {
        const { orderId } = this.props;
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'path',
                    parameter: 'id',
                    value: orderId
                }]}
                resource={orderResources.findOne}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return <OrderDetailControl data={[renderProps.data]} />;
                    }
                    return null;
                }}
            />
        );
    }
}