import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdDivider, AntdList, AntdRow } from '@/components';
import {
    OrderDetail,
    orderDetailUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';
import { formatCurrency } from '@/utilities';

import { OrderDetailItem } from './cart-drawer-content';

const DiscountLabel = styled.span`
    color: #7EA233;
    font-weight: bold;
`;

interface CartDrawerContentProps extends WithTempOrderDetails {
    readonly mode: 'default' | 'simple';
}

@withTempOrderDetails
export class CartDrawerContent extends React.PureComponent<CartDrawerContentProps> {
    render() {
        const { orderDetails, mode } = this.props;
        const totalDiscount = orderDetailUtils.getTotalDiscount(orderDetails);
        const total = orderDetailUtils.getTotalPrice(orderDetails);
        return (
            <div style={{ marginBottom: 30 }}>
                <AntdList
                    itemLayout="vertical"
                    dataSource={orderDetails}
                    renderItem={(item: OrderDetail) => {
                        if (typeof item.product_type === 'string') {
                            return null;
                        }

                        return (
                            <OrderDetailItem
                                mode={mode}
                                key={item.productModulesCode}
                                productType={item.product_type}
                                orderDetail={item}
                            />
                        );
                    }}
                />
                <AntdDivider />
                <div style={{ padding: '0 50px' }}>
                    <AntdRow style={{ margin: '0 0 10px 0' }}>
                        <AntdCol span={12} style={{ color: '#7EA233' }}>
                            <DiscountLabel>
                                Giảm giá:
                        </DiscountLabel>
                        </AntdCol>
                        <AntdCol span={12} style={{ color: '#7EA233' }}>
                            <div style={{ textAlign: 'right' }}>
                                <DiscountLabel>
                                    {formatCurrency(totalDiscount)} đ
                            </DiscountLabel>
                            </div>
                        </AntdCol>
                    </AntdRow>
                    <AntdRow>
                        <AntdCol span={12}>
                            <strong>
                                Tổng cộng:
                            </strong>
                        </AntdCol>
                        <AntdCol span={12}>
                            <div style={{ textAlign: 'right' }}>
                                <strong>
                                    {formatCurrency(total)} đ
                                </strong>
                            </div>
                        </AntdCol>
                    </AntdRow>
                </div>
            </div>
        );
    }

    readonly temp = () => {
        const { orderDetails } = this.props;
        return (
            <>
                <AntdRow style={{ margin: '0 0 10px 0' }}>
                    <AntdCol span={12}>
                        Số lượng sản phẩm:
                    </AntdCol>
                    <AntdCol span={12}>
                        <div style={{ textAlign: 'right' }}>
                            {orderDetailUtils.getQuantity(orderDetails)}
                        </div>
                    </AntdCol>
                </AntdRow>
                <AntdRow>
                    <AntdCol span={12}>
                        Tổng khối lượng:
                    </AntdCol>
                    <AntdCol span={12}>
                        <div style={{ textAlign: 'right' }}>
                            {orderDetailUtils.getTotalVolume(orderDetails)} m<sup>3</sup>
                        </div>
                    </AntdCol>
                </AntdRow>
            </>
        );
    }
}