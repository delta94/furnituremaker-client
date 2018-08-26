import 'ant-design-pro/lib/PageHeader/style/index.less';
import 'ant-design-pro/lib/DescriptionList/style/index.less';

import PageHeader from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import styled from 'styled-components';

import { AntdButton, AntdCol, AntdIcon, AntdRow, AntdTag } from '@/components';
import { colorPrimary } from '@/configs';
import { Order, orderDetailUtils, orderUtils } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const AntdDescriptionList = require('ant-design-pro/lib/DescriptionList');

const PageHeaderWrapper = styled.div`
    margin: 0 0 30px 0;
`;

const OrderId = styled.span`
    color: ${colorPrimary};
`;

export interface OrderDetailHeaderProps {
    readonly order: Order;
    readonly onOrderCancel: (order: Order) => void;
}

export class OrderDetailHeader extends React.Component<OrderDetailHeaderProps> {
    render() {
        const { order, onOrderCancel } = this.props;
        const statusInfo = orderUtils.getStatusInfo(order);

        return (
            <PageHeaderWrapper>
                <PageHeader
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    title={<React.Fragment>Order: <OrderId>{order.code}</OrderId></React.Fragment>}
                    content={(
                        <AntdDescriptionList title={order.note || 'Chi tiết:'} size="small" col={2}>
                            <AntdDescriptionList.Description term="Ngày đặt">
                                {formatDate(order.createdAt, 'DD-MM-YYYY HH:mm')}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Số lượng">
                                {orderDetailUtils.getQuantity(order.orderDetails)} sản phẩm
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Tổng giá trị sản phẩm">
                                {formatCurrency(order.totalPrice)}
                            </AntdDescriptionList.Description>
                            {
                                order.productsDiscount && (
                                    <AntdDescriptionList.Description term="Giảm giá sản phẩm">
                                        {formatCurrency(order.productsDiscount)}
                                    </AntdDescriptionList.Description>
                                )
                            }
                            {
                                order.promotion && (
                                    <AntdDescriptionList.Description
                                        term={`Mã khuyến mại #${order.promotion.code}`}
                                    >
                                        -{formatCurrency(order.promotionDiscount)}
                                    </AntdDescriptionList.Description>
                                )
                            }
                            <AntdDescriptionList.Description term="Phí vận chuyển">
                                {formatCurrency(order.shippingFee)}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Yêu cầu đặt cọc">
                                {formatCurrency(order.depositRequired)}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Dự kiến giao hàng">
                                {formatDate(order.shippingDate, 'DD-MM-YYYY')}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Điện thoại">
                                {order.phone}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Email">
                                {order.email}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Tỉnh thành">
                                {order.shippingToCity.name}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Địa chỉ nhận hàng">
                                {order.shippingAddress}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Tình trạng">
                                <AntdTag color={statusInfo.color}>
                                    <AntdIcon type={statusInfo.icon} /> {statusInfo.label}
                                </AntdTag>
                            </AntdDescriptionList.Description>
                        </AntdDescriptionList>
                    )}
                    action={(
                        <AntdButton.Group>
                            {
                                orderUtils.canChange(order) && (
                                    <AntdButton
                                        type="danger"
                                        ghost={true}
                                        icon="rollback"
                                        onClick={() => onOrderCancel(order)}
                                    >
                                        Đổi trả
                                    </AntdButton>
                                )
                            }
                            {
                                orderUtils.canCancel(order) && (
                                    <AntdButton
                                        type="danger"
                                        ghost={true}
                                        icon="delete"
                                        onClick={() => onOrderCancel(order)}
                                    >
                                        Hủy đơn hàng
                                    </AntdButton>
                                )
                            }
                        </AntdButton.Group>
                    )}
                    extraContent={(
                        <AntdRow>
                            <AntdCol sm={24} md={12}>
                                <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>Cần thanh toán</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
                                    {formatCurrency(order.totalOfPayment)}
                                </div>
                            </AntdCol>
                            <AntdCol sm={24} md={12}>
                                <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>Đã thanh toán</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
                                    {formatCurrency(order.theAmountPaid)}
                                </div>
                            </AntdCol>
                        </AntdRow>
                    )}
                />
            </PageHeaderWrapper>
        );
    }
}