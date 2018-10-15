import * as React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';
import { OrdersFilterControl } from '@/forms/orders-filter';
import { ProfileLayoutContentHeader } from '@/layout';

const OrderListHeaderWrapper = styled.div`
    display: block;
`;

export class OrderPageHeader extends React.Component {
    render() {
        return (
            <Container>
                <OrderListHeaderWrapper>
                    <ProfileLayoutContentHeader>
                        ĐƠN HÀNG CỦA BẠN
                    </ProfileLayoutContentHeader>
                    <OrdersFilterControl />
                </OrderListHeaderWrapper>
            </Container>
        );
    }
}