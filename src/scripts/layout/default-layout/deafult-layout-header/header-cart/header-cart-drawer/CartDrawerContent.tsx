import * as React from 'react';

import {
    withTempOrderDetails,
    WithTempOrderDetails,
    restfulStore,
    OrderDetail
} from '@/restful';

import { AntdList } from '@/components';

import { OrderDetailItem } from './cart-drawer-content';
interface CartDrawerContentProps extends WithTempOrderDetails {
}

@withTempOrderDetails(restfulStore)
export class CartDrawerContent extends React.Component<CartDrawerContentProps> {
    render() {
        const { orderDetails } = this.props;
        return (
            <AntdList
                itemLayout="vertical"
                dataSource={orderDetails}
                renderItem={(item: OrderDetail) => {
                    return (
                        <OrderDetailItem
                            productType={item.productType}
                            orderDetail={item}
                        />
                    );
                }}
            />
        );
    }
}