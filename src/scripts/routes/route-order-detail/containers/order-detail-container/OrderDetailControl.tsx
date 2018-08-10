import * as React from 'react';
import { restfulDataContainer } from 'react-restful';

import { Order, orderResourceType, restfulStore } from '@/restful';

import { OrderDetail, OrderDetailProps } from './order-detail-control';

interface OrderDetailControlProps extends OrderDetailProps {

}

class OrderDetailControlComponent extends React.Component<OrderDetailControlProps> {
    render() {
        const { order } = this.props;
        return (
            <OrderDetail
                order={order}
            />
        );
    }
}

export const OrderDetailControl = restfulDataContainer<Order, OrderDetailControlProps>({
    store: restfulStore,
    resourceType: orderResourceType,
    mapToProps: (data) => {
        return {
            order: data[0]
        };
    }
})(OrderDetailControlComponent);