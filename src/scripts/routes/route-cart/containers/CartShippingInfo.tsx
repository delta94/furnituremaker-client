import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCard, AntdModal } from '@/components';
import { InitAppStoreProps } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    Order,
    orderUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

const CartShippingInfoWrapper = styled.div`
    .ant-card-head {
        background: #D6D6D6;
        text-align: center;
    }
    .ant-card-body {
        padding-left: 0!important;
        padding-right: 0!important;
    }
    .ant-card-head-title {
        justify-content: center;
    }
`;

interface CartDrawerFooterProps extends
    WithTempOrderDetails,
    Pick<InitAppStoreProps, 'history'> {
}

@withTempOrderDetails
@withStoreValues<InitAppStoreProps>('history')
export class CartShippingInfo extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails } = this.props;

        return (
            <CartShippingInfoWrapper>
                <AntdCard bordered={false} title="THÔNG TIN GIAO HÀNG">
                    <CreateOrderControl
                        part="shiping-info"
                        orderDetails={orderDetails}
                    />
                </AntdCard>
            </CartShippingInfoWrapper>
        );
    }
}