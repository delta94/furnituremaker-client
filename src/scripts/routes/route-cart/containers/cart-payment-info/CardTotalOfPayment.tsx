import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import { OrderDetail, orderDetailUtils, orderUtils } from '@/restful';
import { formatCurrency } from '@/utilities';

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

interface CardTotalOfPaymentProps extends
    Pick<CommonStoreProps, 'selectedPromotion'>,
    Pick<CommonStoreProps, 'orderFormSelectedCity'> {
    readonly orderDetails: OrderDetail[];
}

@withStoreValues(
    nameof<CardTotalOfPaymentProps>(o => o.selectedPromotion),
    nameof<CardTotalOfPaymentProps>(o => o.orderFormSelectedCity),
)
export class CardTotalOfPayment extends React.Component<CardTotalOfPaymentProps> {
    render() {
        const { orderDetails, selectedPromotion, orderFormSelectedCity } = this.props;

        const productTotalPayment = orderDetailUtils.getTotalOfPayment(orderDetails);
        const orderTransportFee = orderUtils.getTransportFee({
            orderDetails,
            shippingToCity: orderFormSelectedCity
        });

        const selectedPromotionDiscount = selectedPromotion ? selectedPromotion.discountPrice : 0;
        const totalOfPayment = productTotalPayment + orderTransportFee - selectedPromotionDiscount;

        return (
            <AntdRow>
                <AntdCol span={12}>
                    <span>Tổng thanh toán:</span>
                </AntdCol>
                <AntdCol span={12}>
                    <TotalPrice>
                        {
                            formatCurrency(totalOfPayment)
                        }
                    </TotalPrice>
                </AntdCol>
            </AntdRow>
        );
    }
}