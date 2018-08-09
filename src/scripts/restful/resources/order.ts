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
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.mapRecord(resourceType, item);
            }
        }
    }),
    add: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('/order'),
        method: 'POST',
        mapDataToStore: (item, resourceType, store) => {
            store.mapRecord(resourceType, item);
        }
    })
};