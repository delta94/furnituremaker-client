import * as React from 'react';
import styled from 'styled-components';

import { Order } from '@/restful';

import {
    OrderDetailHeader,
    OrderDetailHeaderProps,
    OrderDetailProductTable,
    OrderDetailStatus
} from './order-detail';

const OrderDetailWrapper = styled.div`
    padding: 0 0 30px 0;
`;

export interface OrderDetailProps extends
    Pick<OrderDetailHeaderProps, 'onOrderCancel'>,
    Pick<OrderDetailHeaderProps, 'onOrderChange'>,
    Pick<OrderDetailHeaderProps, 'onUpdateOrderClick'> {
    readonly order: Order;
}

export class OrderDetail extends React.Component<OrderDetailProps> {
    render() {
        const { order, onOrderCancel, onOrderChange, onUpdateOrderClick } = this.props;
        return (
            <OrderDetailWrapper>
                <OrderDetailHeader
                    order={order}
                    onOrderCancel={onOrderCancel}
                    onOrderChange={onOrderChange}
                    onUpdateOrderClick={onUpdateOrderClick}
                />
                <OrderDetailStatus order={order} />
                <OrderDetailProductTable order={order} />
            </OrderDetailWrapper>
        );
    }
}