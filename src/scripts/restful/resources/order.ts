import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '../apiEntry';
import { OrderDetail } from './orderDetail';

export interface Order extends RecordType {
    readonly id?: number;
    readonly orderDetails: OrderDetail[];
    readonly phone: string;
    readonly email: string;
    readonly shippingAddress: string;
    readonly shippingDate: string;
}

export const orderResourceType = new ResourceType({
    name: 'order',
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        resourceType: nameof<OrderDetail>(),
        field: nameof<Order>(o => o.orderDetails),
        type: 'MANY'
    }]
});

export const orderResources = {
    find: new Resource<Order[]>({
        resourceType: orderResourceType,
        url: apiEntry('/order'),
        method: 'GET',
        mapDataToStore: (orders, resourceType, store) => {
            for (const order of orders) {
                store.mapRecord(resourceType, order);
            }
        }
    }),
    add: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('/order'),
        method: 'POST',
        mapDataToStore: (order, resourceType, store) => {
            store.mapRecord(resourceType, order);
            const orderDetailType = store.getRegisteredResourceType(nameof<OrderDetail>());
            for (const orderDetail of order.orderDetails) {
                store.mapRecord(orderDetailType, orderDetail);
            }
        }
    })
};