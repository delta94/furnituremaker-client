import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import { OrderDetail, orderDetailUtils, orderUtils } from '@/restful';
import { ShippingCost } from '@/routes/route-cart/containers/CartUI';
import { formatCurrency } from '@/utilities';

interface CardTotalOfPaymentProps extends
    Pick<CommonStoreProps, 'orderFormSelectedCity'> {
    readonly orderDetails: OrderDetail[];
}

@withStoreValues<CardTotalOfPaymentProps>('orderFormSelectedCity')
export class CartTransportFee extends React.Component<CardTotalOfPaymentProps> {
    render() {
        const { orderDetails, orderFormSelectedCity } = this.props;
        const totalVolume = orderUtils.getTransportFee({
            orderDetails,
            shippingToCity: orderFormSelectedCity
        });

        return (
            <AntdRow>
                <AntdCol span={12}>
                    <span>Phí vận chuyển:</span>
                </AntdCol>
                <AntdCol span={12}>
                    <ShippingCost>
                        {formatCurrency(totalVolume)}
                    </ShippingCost>
                </AntdCol>
            </AntdRow>
        );
    }
}