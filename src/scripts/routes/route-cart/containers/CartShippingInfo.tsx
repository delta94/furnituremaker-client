import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCard, AntdModal } from '@/components';
import { InitAppStoreProps } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    Order,
    orderUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

const CartShippingInfoWrapper = styled.div`
    .ant-card-head {
        background: #D6D6D6;
        text-align: center;
    }
    .ant-card-body {
        padding-left: 0!important;
        padding-right: 0!important;
    }
`;

interface CartDrawerFooterProps extends
    WithTempOrderDetails,
    Pick<InitAppStoreProps, 'history'> {
}

@withTempOrderDetails
@withStoreValues<InitAppStoreProps>('history')
export class CartShippingInfo extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails, history } = this.props;

        return (
            <CartShippingInfoWrapper>
                <AntdCard bordered={false} title="THÔNG TIN GIAO HÀNG">
                    <CreateOrderControl
                        orderDetails={orderDetails}
                        onOrderCreate={(order: Order) => {
                            const toOrderDetailPageUrl = orderUtils.getDetailPageUrl(order);
                            AntdModal.success({
                                title: 'Đặt hàng thành công',
                                content: 'Nhân viên của Furniture Maker sẽ liên hệ với bạn trong thời gian sớm nhất!',
                                okText: 'Xem đơn hàng',
                                okType: 'default',
                                cancelText: 'Tiếp tục mua sắm',
                                onOk: () => history.push(toOrderDetailPageUrl),
                                onCancel: () => history.push('/')
                            });
                        }}
                    />
                </AntdCard>
            </CartShippingInfoWrapper>
        );
    }
}