import * as moment from 'moment';
import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { apiEntry } from '../apiEntry';
import { OrderDetail } from './orderDetail';

const sortBy = require('lodash/sortBy');

export interface Order extends RecordType {
    readonly id?: string;
    readonly orderDetails: OrderDetail[];
    readonly phone: string;
    readonly email: string;
    readonly shippingAddress: string;
    readonly shippingDate: string;
    readonly depositRequired: number;
    readonly theAmountPaid: number;
    readonly paid: boolean;
    readonly totalPrice: number;
    readonly status: 'new' | 'confirmed' | 'processing' | 'shipping' | 'done' | 'cancel';
    readonly createdAt?: string;
}

export const orderResourceType = new ResourceType({
    name: nameof<Order>(),
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
    findOne: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('/order/:id'),
        method: 'GET',
        mapDataToStore: (order, resourceType, store) => {
            store.mapRecord(resourceType, order);
            const orderDetailType = store.getRegisteredResourceType(nameof<OrderDetail>());
            for (const orderDetail of order.orderDetails) {
                store.mapRecord(orderDetailType, orderDetail);
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

export const orderUtils = {
    getShippingDate: (date?: Date, format?: string) => {
        const shippingDateMoment = date ?
            moment(date) :
            moment();

        shippingDateMoment.add(14, 'days');
        const targetDay = shippingDateMoment.day();
        if (targetDay === 0) {
            shippingDateMoment.add(1, 'day');
        } else if (targetDay === 6) {
            shippingDateMoment.add(2, 'days');
        }

        return shippingDateMoment.toDate();
    }
};

export interface WithOrdersProps {
    readonly orders?: Order[];
}

export const withOrders = (store) =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<WithOrdersProps>): any =>
        restfulDataContainer<Order, WithOrdersProps>({
            store,
            resourceType: orderResourceType,
            mapToProps: (data) => {
                // tslint:disable-next-line:no-array-mutation
                const sorted = data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateA.getTime() - dateB.getTime();
                }).reverse();

                return {
                    orders: sorted
                };
            }
        })(Component);