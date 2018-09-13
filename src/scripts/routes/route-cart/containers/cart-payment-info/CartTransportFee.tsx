import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStoreValues } from '@/app';
import { AntdCol, AntdModal, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';
import { OrderDetail, orderUtils } from '@/restful';
import { ShippingCost } from '@/routes/route-cart/containers/CartUI';
import { formatCurrency } from '@/utilities';

import { TransportFeeByCity } from './cart-transport-fee';

interface CardTotalOfPaymentProps extends
    Pick<CommonStoreProps, 'orderFormSelectedCity'> {
    readonly orderDetails: OrderDetail[];
}

interface CartTransportFeeState {
    readonly modalVisibled: boolean;
}

@withStoreValues<CardTotalOfPaymentProps>('orderFormSelectedCity')
export class CartTransportFee extends React.Component<CardTotalOfPaymentProps, CartTransportFeeState> {

    constructor(props: CardTotalOfPaymentProps) {
        super(props);
        this.state = {
            modalVisibled: false
        };
    }

    render() {
        const { orderDetails, orderFormSelectedCity } = this.props;
        const totalVolume = orderUtils.getTransportFee({
            orderDetails,
            shippingToCity: orderFormSelectedCity
        });
        const { modalVisibled } = this.state;
        return (
            <AntdRow>
                <AntdCol span={12}>
                    <div>Phí vận chuyển:</div>
                    <a
                        onClick={() => this.setState({ modalVisibled: true })}
                    >
                        Xem chính sách vận chuyển
                    </a>
                    <AntdModal
                        title="Biểu phí vận chuyển"
                        visible={modalVisibled}
                        onOk={() => this.setState({ modalVisibled: false })}
                        cancelButtonProps={{
                            style: { display: 'none' }
                        }}
                    >
                        <TransportFeeByCity />
                    </AntdModal>
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