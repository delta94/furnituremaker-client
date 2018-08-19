import * as React from 'react';
import { restfulDataContainer } from 'react-restful';

import { withStoreValues } from '@/app';
import { AntdModal } from '@/components';
import { InitAppStoreProps } from '@/configs';
import {
    Order,
    orderResources,
    orderResourceType,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { OrderDetail, OrderDetailProps } from './order-detail-control';

export interface OrderDetailControlProps extends
    Pick<OrderDetailProps, 'order'>,
    Pick<InitAppStoreProps, 'history'> {
}

@withStoreValues<InitAppStoreProps>('history')
class OrderDetailControlComponent extends React.Component<OrderDetailControlProps> {
    readonly onOrderCancel = async (order: Order) => {
        await restfulFetcher.fetchResource(
            orderResources.delete,
            [{
                type: 'path',
                parameter: 'id',
                value: order.id
            }]
        );
    }

    componentDidUpdate() {
        const { order, history } = this.props;
        if (!order) {
            history.replace('/orders');
        }
    }

    render() {
        const { order } = this.props;
        return (
            <OrderDetail
                order={order}
                onOrderCancel={() => {
                    AntdModal.confirm({
                        title: 'Xác nhận',
                        content: 'Có phải bạn muốn xóa đơn hàng này',
                        okType: 'danger',
                        onOk: () => this.onOrderCancel(order)
                    });
                }}
            />
        );
    }
}

export const OrderDetailControl = restfulDataContainer<Order, OrderDetailControlProps>({
    store: restfulStore,
    resourceType: orderResourceType,
    mapToProps: (data) => {
        return {
            order: data[0]
        };
    }
})(OrderDetailControlComponent);