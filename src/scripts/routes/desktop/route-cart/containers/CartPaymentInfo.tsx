import * as React from 'react';
import styled from 'styled-components';

import {
    AntdAffix,
    AntdCard,
    AntdCol,
    AntdDivider,
    AntdRow
} from '@/components';
import {
    orderDetailUtils,
    orderUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';
import {
    CartTransportFee
} from '@/routes/desktop/route-cart/containers/cart-payment-info/CartTransportFee';
import { formatCurrency, formatDate, toVNDay } from '@/utilities';

import {
    CardTotalOfPayment,
    CartDiscountByAgencyLevel,
    CartUsePromoCode
} from './cart-payment-info';
import { SectionTitle, ShippingCost } from './CartUI';

const ShippingDate = styled.div`
    text-align: right;
`;

const CartPaymentInfoWrapper = styled.div`
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

interface CartPaymentInfoProps extends
    WithTempOrderDetails {
    // implement...
}

@withTempOrderDetails
export class CartPaymentInfo extends React.Component<CartPaymentInfoProps> {
    render() {
        const { orderDetails } = this.props;

        if (!orderDetails.length) {
            return null;
        }

        const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
        const totalProductsDiscount = orderDetailUtils.getTotalDiscount(orderDetails);

        const shippingDate = orderUtils.getShippingDate();

        return (
            <CartPaymentInfoWrapper>
                <AntdCard bordered={false} title="THÔNG TIN THANH TOÁN">
                    <AntdRow>
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
                    <CartDiscountByAgencyLevel orderPrice={totalPrice - totalProductsDiscount} />
                    <AntdDivider dashed={true} />
                    <CartUsePromoCode />
                    <AntdDivider dashed={true} />

                    <CartTransportFee orderDetails={orderDetails} />
                    <AntdDivider dashed={true} />
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
                </AntdCard>
                <CardTotalOfPayment orderDetails={orderDetails} />
            </CartPaymentInfoWrapper >
        );
    }
}