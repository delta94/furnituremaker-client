import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { colorPrimary, CommonStoreProps, Include } from '@/configs';
import { OrderDetail, orderDetailUtils } from '@/restful';
import { formatCurrency } from '@/utilities';

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

interface CardTotalOfPaymentProps extends
    Include<CommonStoreProps, 'selectedPromotion'> {
    readonly orderDetails: OrderDetail[];
}

@withStoreValues(nameof<CardTotalOfPaymentProps>(o => o.selectedPromotion))
export class CardTotalOfPayment extends React.Component<CardTotalOfPaymentProps> {
    render() {
        const { orderDetails, selectedPromotion } = this.props;

        const selectedPromotionDiscount = selectedPromotion ? selectedPromotion.discountPrice : 0;
        const totalOfPayment = orderDetailUtils.getTotalOfPayment(orderDetails) - selectedPromotionDiscount;

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