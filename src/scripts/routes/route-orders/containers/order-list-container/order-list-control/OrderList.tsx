import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';
import { Order } from '@/restful';

import { OrderListContent, OrderListHeader } from './order-list';

const OrderListWrapper = styled.div`
    padding: 0 0 0 0;
    display: block;
    table {
        background: #F7F7F7;
    }
`;

export interface OrderListProps {
    readonly orders: Order[];
}

export class OrderList extends React.PureComponent<OrderListProps> {
    render() {
        const { orders } = this.props;
        return (
            <Container>
                <OrderListWrapper>
                    <OrderListHeader />
                    <OrderListContent orders={orders} />
                </OrderListWrapper>
            </Container>
        );
    }
}