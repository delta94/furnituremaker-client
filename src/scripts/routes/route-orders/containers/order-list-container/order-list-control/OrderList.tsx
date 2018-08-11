import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';

import { OrderListContent, OrderListHeader } from './order-list';

const OrderListWrapper = styled.div`
    padding: 0 0 0 0;
    display: block;
`;

export class OrderList extends React.Component {
    render() {
        return (
            <Container>
                <OrderListWrapper>
                    <OrderListHeader />
                    <OrderListContent />
                </OrderListWrapper>
            </Container>
        );
    }
}