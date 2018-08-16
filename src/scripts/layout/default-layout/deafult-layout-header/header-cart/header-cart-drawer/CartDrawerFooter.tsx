import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdDivider, AntdModal, AntdRow } from '@/components';
import { colorPrimary } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    orderDetailUtils,
    orderUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const ShippingCost = styled.div`
    text-align: right;
    font-size: 18px;
    color: #000000;
`;

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

const ShippingDate = styled.div`
    text-align: right;
`;

const SectionTitle = styled.h3`
    display: bold;
    text-transform: uppercase;
`;

interface CartDrawerFooterProps extends WithTempOrderDetails {
    readonly onCartDrawerClose: () => void;
}

@withTempOrderDetails(restfulStore)
export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails, onCartDrawerClose } = this.props;

        const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
        const totalDiscount = orderDetailUtils.getTotalDiscount(orderDetails);
        const totalOfPayment = orderDetailUtils.getTotalOfPayment(orderDetails);
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
                    <AntdCol span={12}>
                        <span>Tổng giảm giá:</span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingCost>
                            -{formatCurrency(totalDiscount)}
                        </ShippingCost>
                    </AntdCol>
                    <AntdCol span={12}>
                        <span>
                            Phí vận chuyển:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingCost>
                            0
                        </ShippingCost>
                    </AntdCol>
                    <AntdCol span={12} offset={12}>
                        <AntdDivider dashed={true} />
                    </AntdCol>
                    <AntdCol span={12}>
                        <span>
                            Tổng thanh toán:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <TotalPrice>
                            {formatCurrency(totalOfPayment)}
                        </TotalPrice>
                    </AntdCol>
                    <AntdCol span={12}>
                        <span>
                            Dự kiến giao hàng:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingDate>
                            {formatDate(shippingDate, 'DD/MM/YYYY')}
                        </ShippingDate>
                    </AntdCol>
                </AntdRow>
                <AntdDivider />
                <SectionTitle>Thông tin giao hàng</SectionTitle>
                <CreateOrderControl
                    orderDetails={orderDetails}
                    onOrderCreate={() => {
                        onCartDrawerClose();
                        AntdModal.success({
                            title: 'Đặt hàng thành công',
                            content: 'Nhân viên của Furniture Maker sẽ liên hệ với bạn trong thời gian sớm nhất!',
                            okText: 'Tiếp tục',
                            okType: 'default'
                        });
                    }}
                />
            </div>
        );
    }
}