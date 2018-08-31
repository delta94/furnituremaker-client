import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';
import { OrderDetail, orderUtils } from '@/restful';
import { transportPolicyRoutePath } from '@/routes';
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
                    <div>Phí vận chuyển:</div>
                    <Link to={transportPolicyRoutePath}>Xem chính sách vận chuyển</Link>
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