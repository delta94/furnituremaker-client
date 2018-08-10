import * as React from 'react';
import styled from 'styled-components';

import { AntdCard, AntdIcon } from '@/components';
import { AntdSteps } from '@/components/antd-component/Steps';

const OrderDetailStatusWrapper = styled.div`
    margin: 0 0 30px 0;
`;

export class OrderDetailStatus extends React.Component {
    render() {
        return (
            <OrderDetailStatusWrapper>
                <AntdCard title="Trạng thái đơn hàng">
                    <AntdSteps current={0}>
                        <AntdSteps.Step
                            status="finish"
                            title="Mới"
                            description="Đợi tiếp nhận"
                        />
                        <AntdSteps.Step title="Đã xác nhận" />
                        <AntdSteps.Step title="Đang xử lý"/>
                        <AntdSteps.Step title="Đang chuyển hàng"/>
                        <AntdSteps.Step title="Hoàn thành" />
                    </AntdSteps>
                </AntdCard>
            </OrderDetailStatusWrapper>
        );
    }
} 