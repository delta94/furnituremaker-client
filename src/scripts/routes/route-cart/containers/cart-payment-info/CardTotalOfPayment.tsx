import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import {
    agencyUtils,
    OrderDetail,
    orderDetailUtils,
    orderUtils,
    restfulStore,
    withAllAgencies,
    WithAllAgenciesProps,
    withCurrentUser,
    WithCurrentUserProps
} from '@/restful';
import { formatCurrency } from '@/utilities';

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

interface CardTotalOfPaymentProps extends
    WithAllAgenciesProps,
    WithCurrentUserProps,
    Pick<CommonStoreProps, 'selectedPromotion'>,
    Pick<CommonStoreProps, 'orderFormSelectedCity'> {
    readonly orderDetails: OrderDetail[];
}

@withCurrentUser(restfulStore)
@withAllAgencies(restfulStore)
@withStoreValues(
    nameof<CardTotalOfPaymentProps>(o => o.selectedPromotion),
    nameof<CardTotalOfPaymentProps>(o => o.orderFormSelectedCity),
)
export class CardTotalOfPayment extends React.PureComponent<CardTotalOfPaymentProps> {
    render() {
        const {
            orderDetails,
            selectedPromotion,
            orderFormSelectedCity,
            user,
            agencies
        } = this.props;

        const productTotalPayment = orderDetailUtils.getTotalOfPayment(orderDetails);

        const currentUserAgency = agencies.find(o => o.id === user.agency.id);

        const discountByAgencyLevel = agencyUtils
            .getOrderDiscountByLevel(currentUserAgency, productTotalPayment);

        const orderTransportFee = orderUtils.getTransportFee({
            orderDetails,
            shippingToCity: orderFormSelectedCity
        });

        const selectedPromotionDiscount = selectedPromotion ? selectedPromotion.discountPrice : 0;
        const totalDiscount = selectedPromotionDiscount + discountByAgencyLevel;
        const totalOfPayment = productTotalPayment + orderTransportFee - totalDiscount;

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