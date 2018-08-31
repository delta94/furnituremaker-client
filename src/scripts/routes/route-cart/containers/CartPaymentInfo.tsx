import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdDivider, AntdRow } from '@/components';
import {
    orderDetailUtils,
    orderUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';
import {
    CartTransportFee
} from '@/routes/route-cart/containers/cart-payment-info/CartTransportFee';
import { formatCurrency, formatDate, toVNDay } from '@/utilities';

import { CardTotalOfPayment, CartUsePromoCode } from './cart-payment-info';
import { SectionTitle, ShippingCost } from './CartUI';

const ShippingDate = styled.div`
    text-align: right;
`;

interface CartPaymentInfoProps extends WithTempOrderDetails {
    // implement...
}

@withTempOrderDetails(restfulStore)
export class CartPaymentInfo extends React.Component<CartPaymentInfoProps> {
    render() {
        const { orderDetails } = this.props;

        const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
        const totalProductsDiscount = orderDetailUtils.getTotalDiscount(orderDetails);
        const shippingDate = orderUtils.getShippingDate();

        return (
            <div>
                <AntdRow>
                    <SectionTitle>Thông tin thanh toán</SectionTitle>
                    <AntdCol span={12}>
                        <span>Tổng tiền:</span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingCost>
                            {formatCurrency(totalPrice)}
                        </ShippingCost>
                    </AntdCol>
                    {
                        totalProductsDiscount && (
                            <React.Fragment>
                                <AntdCol span={12}>
                                    <span>Giảm giá sản phẩm:</span>
                                </AntdCol>
                                <AntdCol span={12}>
                                    <ShippingCost>
                                        -{formatCurrency(totalProductsDiscount)}
                                    </ShippingCost>
                                </AntdCol>
                            </React.Fragment>
                        )
                    }
                </AntdRow>
                <AntdDivider dashed={true} />
                <CartUsePromoCode />
                <AntdDivider dashed={true} />
                <CartTransportFee orderDetails={orderDetails} />
                <AntdDivider dashed={true} />
                <CardTotalOfPayment orderDetails={orderDetails} />
                <AntdRow>
                    <AntdCol span={12}>
                        <span>Dự kiến giao hàng:</span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingDate>
                            {`${toVNDay(shippingDate)} - ${formatDate(shippingDate, 'DD/MM/YYYY')}`}
                        </ShippingDate>
                    </AntdCol>
                </AntdRow>
                <AntdDivider dashed={true} />
            </div>
        );
    }
}