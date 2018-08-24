import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';
import { OrdersFilterControl } from '@/forms/orders-filter';

const OrderListHeaderWrapper = styled.div`
    display: block;
`;

export class OrderPageHeader extends React.Component {
    render() {
        return (
            <Container>
                <OrderListHeaderWrapper>
                    <h1>Đơn hàng của bạn</h1>
                    <OrdersFilterControl />
                </OrderListHeaderWrapper>
            </Container>
        );
    }
}