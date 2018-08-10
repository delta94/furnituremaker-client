import * as React from 'react';
import styled from 'styled-components';

const OrderListHeaderWrapper = styled.div`
    display: block;
`;

export class OrderListHeader extends React.Component {
    render() {
        return (
            <OrderListHeaderWrapper>
                <h1>Đơn hàng của bạn</h1>
            </OrderListHeaderWrapper>
        );
    }
}