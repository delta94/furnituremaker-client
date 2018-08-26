import * as React from 'react';

import { OrderList, OrderListProps } from './order-list-control';

interface OrderListControlProps
    extends OrderListProps {

}

export class OrderListControl extends React.Component<OrderListControlProps> {
    render() {
        const { orders } = this.props;
        return (
            <OrderList orders={orders} />
        );
    }
}