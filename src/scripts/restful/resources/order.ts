import { OrderDetail } from './orderDetail';
import { ResourceType, Resource, RecordType } from 'react-restful/dist';
import { apiEntry } from '@/restful/apiEntry';

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
    add: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('order'),
        method: 'GET',
        mapDataToStore: (item, resourceType, store) => {
            store.mapRecord(resourceType, item);
        }
    })
};