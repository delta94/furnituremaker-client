import * as React from 'react';
import styled from 'styled-components';

import { AntdCard } from '@/components';
import { AntdSteps } from '@/components/antd-component/Steps';
import { Order, orderUtils } from '@/restful';

const OrderDetailStatusWrapper = styled.div`
    margin: 0 0 30px 0;
    
    .ant-steps-item-title {
        font-size: 11px;
    }
`;

interface OrderDetailStatusProps {
    readonly order: Order;
}

export class OrderDetailStatus extends React.Component<OrderDetailStatusProps> {
    render() {
        const { order } = this.props;

        const orderStatus = orderUtils.getStatusInfo(order);
        return (
            <OrderDetailStatusWrapper>
                <AntdCard title="Trạng thái đơn hàng">
                    <AntdSteps current={orderStatus.index}>
                        <AntdSteps.Step title="Mới"/>
                        <AntdSteps.Step title="Đã xác nhận" />
                        <AntdSteps.Step title="Đang Lắp ráp" />
                        <AntdSteps.Step title="Đợi thanh toán" />
                        <AntdSteps.Step title="Đang chuyển hàng" />
                        <AntdSteps.Step title="Hoàn thành" />
                    </AntdSteps>
                </AntdCard>
            </OrderDetailStatusWrapper>
        );
    }
} 