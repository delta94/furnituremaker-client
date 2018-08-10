import * as React from 'react';
import { restfulDataContainer } from 'react-restful';

import { withOrders, WithOrdersProps } from '@/restful';

import { OrderList } from './order-list-control';

interface OrderListControlProps {

}

export class OrderListControl extends React.Component<OrderListControlProps> {
    render() {
        return (
            <OrderList />
        );
    }
}