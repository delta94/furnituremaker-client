import * as React from 'react';

import { withStoreValues } from '@/app';
import { AntdModal } from '@/components';
import { colorPrimary, InitAppStoreProps } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    Order,
    orderUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

import { SectionTitle } from './CartUI';

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
            <div>
                <SectionTitle>Thông tin giao hàng</SectionTitle>
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
            </div>
        );
    }
}