import * as React from 'react';

import { OrderFilterForm } from './orders-filter-control';

interface OrdersFilterControlProps {

}

export class OrdersFilterControl extends React.PureComponent<OrdersFilterControlProps> {
    render() {
        return (
            <OrderFilterForm />
        );
    }
}