import 'ant-design-pro/lib/PageHeader/style/index.less';
import 'ant-design-pro/lib/DescriptionList/style/index.less';

import PageHeader from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import styled from 'styled-components';

import { AntdButton, AntdCol, AntdModal, AntdRow, AntdTag } from '@/components';
import { colorPrimary } from '@/configs';
import { Order, orderDetailUtils } from '@/restful';
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

        return (
            <PageHeaderWrapper>
                <PageHeader
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    title={<React.Fragment>Order: <OrderId>{order.id}</OrderId></React.Fragment>}
                    content={(
                        <AntdDescriptionList title="Chi tiết:" size="small" col={2}>
                            <AntdDescriptionList.Description term="Ngày tạo">
                                {formatDate(order.createdAt, 'DD-MM-YYYY')}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Số lượng	">
                                {orderDetailUtils.getQuantity(order.orderDetails)}
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
                                order.promotionDiscount && (
                                    <AntdDescriptionList.Description term="Sử dụng mã ưu đãi">
                                        {formatCurrency(order.promotionDiscount)}
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
                            <AntdDescriptionList.Description term="Địa chỉ nhận hàng">
                                {order.shippingAddress}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Tình trạng">
                                <AntdTag color="green">{order.status}</AntdTag>
                            </AntdDescriptionList.Description>
                        </AntdDescriptionList>
                    )}
                    action={(
                        <AntdButton
                            type="danger"
                            ghost={true}
                            icon="delete"
                            onClick={() => onOrderCancel(order)}
                        >
                            Hủy đơn hàng
                        </AntdButton>
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