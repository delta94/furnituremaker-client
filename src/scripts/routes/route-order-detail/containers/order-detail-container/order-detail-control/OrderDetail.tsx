import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';
import { Order } from '@/restful';

import {
    OrderDetailHeader,
    OrderDetailProductTable,
    OrderDetailStatus
} from './order-detail';

const OrderDetailWrapper = styled.div`
    padding: 0 0 0 0;
`;

export interface OrderDetailProps {
    readonly order: Order;
}

export class OrderDetail extends React.Component<OrderDetailProps> {
    render() {
        const { order } = this.props;
        return (
            <Container>
                <OrderDetailWrapper>
                    <OrderDetailHeader order={order} />
                    <OrderDetailStatus />
                    <OrderDetailProductTable order={order} />
                </OrderDetailWrapper>
            </Container>
        );
    }
}