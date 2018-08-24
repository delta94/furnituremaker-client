import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';
import { Order } from '@/restful';

import {
    OrderDetailHeader,
    OrderDetailHeaderProps,
    OrderDetailProductTable,
    OrderDetailStatus
} from './order-detail';

const OrderDetailWrapper = styled.div`
    padding: 0 0 0 0;
`;

export interface OrderDetailProps extends
    Pick<OrderDetailHeaderProps, 'onOrderCancel'> {
    readonly order: Order;
}

export class OrderDetail extends React.Component<OrderDetailProps> {
    render() {
        const { order, onOrderCancel } = this.props;
        return (
            <Container>
                <OrderDetailWrapper>
                    <OrderDetailHeader
                        order={order}
                        onOrderCancel={onOrderCancel}
                    />
                    <OrderDetailStatus order={order} />
                    <OrderDetailProductTable order={order} />
                </OrderDetailWrapper>
            </Container>
        );
    }
}