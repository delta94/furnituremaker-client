import * as moment from 'moment';
import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { City } from '@/restful/resources/city';
import { County } from '@/restful/resources/county';

import { apiEntry } from '../apiEntry';
import { OrderDetail } from './orderDetail';
import { Promotion } from './promotion';

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
    readonly promotion?: Promotion;
    readonly note?: string;
    readonly shippingToCity: City;
    readonly county: County;
    readonly shippingFee: number;
    readonly totalOfPayment: number;
    readonly totalDiscount: number;
    readonly productsDiscount: number;
    readonly promotionDiscount: number;
    readonly agencyCommissionPercent: number;
    readonly agencyCommissionValue: number;
    readonly billDiscount: number;
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
    }),
    delete: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('/order/:id'),
        method: 'DELETE',
        mapDataToStore: (order, resourceType, store) => {
            store.removeRecord(resourceType, order);
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
    },
    getTransportFee(order: Partial<Order>) {
        const { orderDetails, shippingToCity } = order;

        if (!orderDetails || !shippingToCity) {
            return 0;
        }

        const totalVolume = orderDetails.reduce(
            (totalVolumeValue, orderDetail) => {
                const orderDetailVolume = orderDetail.productType.volume * orderDetail.quantity;
                return totalVolumeValue += (orderDetailVolume || 0);
            },
            0
        );

        const flatTransportFee = shippingToCity ? shippingToCity.transportFee : 0;
        const totalTransportFee = Math.ceil(totalVolume * flatTransportFee);
        const lastThreeNumber = (totalTransportFee % 1000);
        const result = totalTransportFee - lastThreeNumber;
        return result;
    },
    getDeposit: (totalOfPayment: number) => {
        return totalOfPayment * 0.3;
    },
    getDetailPageUrl: (order: Order) => {
        return `/orders/${order.id}`;
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