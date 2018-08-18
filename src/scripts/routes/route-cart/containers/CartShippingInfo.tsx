import * as React from 'react';

import { AntdModal } from '@/components';
import { colorPrimary } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

import { SectionTitle } from './CartUI';

interface CartDrawerFooterProps extends WithTempOrderDetails {
    // implement...
}

@withTempOrderDetails(restfulStore)
export class CartShippingInfo extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails } = this.props;

        return (
            <div>
                <SectionTitle>Thông tin giao hàng</SectionTitle>
                <CreateOrderControl
                    orderDetails={orderDetails}
                    onOrderCreate={() => {
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