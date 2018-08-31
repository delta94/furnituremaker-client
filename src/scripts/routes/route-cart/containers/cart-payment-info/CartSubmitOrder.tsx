import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdButton } from '@/components';
import { CommonStoreProps } from '@/configs';

const CartSubmitOrderWrapper = styled.div`
    text-align: right;
`;

@withStoreValues(
    nameof<CommonStoreProps>(o => o.submitOrderForm),
    nameof<CommonStoreProps>(o => o.orderFormStatus),
)
export class CartSubmitOrder extends React.Component<CommonStoreProps> {
    render() {
        const { submitOrderForm, orderFormStatus } = this.props;
        return (
            <CartSubmitOrderWrapper>
                <AntdButton
                    type="primary"
                    onClick={submitOrderForm}
                    loading={orderFormStatus === 'submitting'}
                >
                    Đặt hàng
                </AntdButton>
            </CartSubmitOrderWrapper>
        );
    }
}