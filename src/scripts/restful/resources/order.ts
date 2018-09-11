import * as moment from 'moment';
import {
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { policies } from '@/app';
import { sendNotificationToFirebase } from '@/firebase';
import {
    AppNotification,
    NotifiCationRefType
} from '@/firebase/firebaseNotificationDB';
import { apiEntry, restfulStore } from '@/restful/environment';
import { genCodeWithCurrentDate } from '@/utilities';

import { Agency } from './agency';
import { City } from './city';
import { County } from './county';
import { OrderDetail } from './orderDetail';
import { OrderTransaction } from './orderTransaction';
import { Promotion } from './promotion';
import { User } from './user';

export interface Order extends RecordType {
    readonly id?: string;
    readonly orderDetails: OrderDetail[];
    readonly phone: string;
    readonly email: string;
    readonly shippingAddress: string;
    readonly shippingDate: string;
    readonly depositRequired: number;
    readonly paid: boolean;
    readonly totalPrice: number;
    readonly status: 'new' | 'confirmed' | 'produce' | 'payment' | 'shipping' | 'done' | 'cancel' | 'change';
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
    readonly code: string;
    readonly agencyOrderer: Agency;
    readonly orderTransactions: Array<OrderTransaction>;
    readonly createdBy: User;
}

export const orderResourceType = new ResourceType<Order>({
    store: restfulStore,
    name: nameof<Order>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        resourceType: nameof<OrderDetail>(),
        field: nameof<Order>(o => o.orderDetails),
        type: 'MANY'
    }, {
        resourceType: nameof<OrderTransaction>(),
        field: nameof<Order>(o => o.orderTransactions),
        type: 'MANY'
    }]
});

export interface OrderUpdateMeta {
    readonly sendNotificationTo: NotifiCationRefType;
    readonly notificationType: AppNotification['type'];
}

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
            const orderTransactionType = store.getRegisteredResourceType(nameof<OrderTransaction>());
            for (const orderTransaction of order.orderTransactions) {
                store.mapRecord(orderTransactionType, orderTransaction);
            }
        }
    }),
    add: new Resource<Order>({
        resourceType: orderResourceType,
        url: apiEntry('/order'),
        method: 'POST',
        afterFetch: (params, order) => {
            const isAdmin = policies.isAdminGroup();
            if (!isAdmin) {
                sendNotificationToFirebase('root', {
                    type: 'new-order',
                    orderId: order.id,
                    fromAgency: order.agencyOrderer.id,
                    fromAgencyName: order.agencyOrderer.name,
                    fromUser: order.createdBy.id,
                    fromUserName: order.createdBy.name
                });
            }
        },
        mapDataToStore: (order, resourceType, store) => {
            store.mapRecord(resourceType, order);
            const orderDetailType = store.getRegisteredResourceType(nameof<OrderDetail>());
            for (const orderDetail of order.orderDetails) {
                store.mapRecord(orderDetailType, orderDetail);
            }
            const orderTransactionType = store.getRegisteredResourceType(nameof<OrderTransaction>());
            for (const orderTransaction of order.orderTransactions) {
                store.mapRecord(orderTransactionType, orderTransaction);
            }
        }
    }),
    update: new Resource<Order, OrderUpdateMeta>({
        resourceType: orderResourceType,
        url: apiEntry('/order/:id'),
        method: 'PUT',
        afterFetch: (params, order, meta) => {
            sendNotificationToFirebase(meta.sendNotificationTo, {
                orderId: order.id,
                fromAgency: order.agencyOrderer.id,
                fromAgencyName: order.agencyOrderer.name,
                fromUser: order.createdBy.id,
                fromUserName: order.createdBy.name,
                type: meta.notificationType
            });
        },
        mapDataToStore: (order, resourceType, store) => {
            store.mapRecord(resourceType, order);
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

export interface OrderStatusInfo {
    readonly icon: string;
    readonly label: string;
    readonly color: string;
    readonly index: number;
}

export const orderUtils = {
    getShippingDate: (options: {
        readonly inventoryProduct?: boolean
    } = {}) => {
        const shippingDateMoment = moment();

        const initDayCount = options.inventoryProduct ? 2 : 14;

        shippingDateMoment.add(initDayCount, 'days');
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
    },
    getStatusInfo: (order: Order): OrderStatusInfo => {
        switch (order.status) {
            case 'new':
                return { label: 'Mới', color: 'green', icon: 'question', index: 0 };
            case 'confirmed':
                return { label: 'Đã xác nhận', color: 'green', icon: 'check', index: 1 };
            case 'produce':
                return { label: 'Đang lắp ráp', color: 'green', icon: 'appstore-o', index: 2 };
            case 'payment':
                return { label: 'Chờ thanh toán', color: 'green', icon: '', index: 3 };
            case 'shipping':
                return { label: 'Đang vận chuyển', color: 'green', icon: 'export', index: 4 };
            case 'done':
                return { label: 'Hoàn thành', color: 'green', icon: 'like', index: 5 };
            case 'cancel':
                return { label: 'Đã hủy', color: 'red', icon: 'close', index: 6 };
            case 'change':
                return { label: 'Đổi trả', color: 'yellow', icon: 'rollback', index: 7 };
            default:
                return null;
        }
    },
    getStatusSelectItems: (): {
        readonly value: Order['status'];
        readonly title: string
    }[] => {
        return [
            { value: 'new', title: 'Mới' },
            { value: 'confirmed', title: 'Đã xác nhận' },
            { value: 'produce', title: 'Đang lắp ráp' },
            { value: 'payment', title: 'Đợi thanh toán' },
            { value: 'shipping', title: 'Đang chuyển hàng' },
            { value: 'done', title: 'Hoàn thành' }
        ];
    },
    canCancel: (order: Order) => {
        return (
            order.status !== 'done' &&
            order.status !== 'cancel' &&
            order.status !== 'change'
        );
    },
    canChange: (order: Order) => {
        return order.status === 'shipping';
    },
    genCode: () => genCodeWithCurrentDate(),
    getCreatedById: (order: Order) => {
        if (!order || !order.createdBy) {
            throw new Error('Who is owner?');
        }

        return (typeof order.createdBy === 'string') ?
            order.createdBy :
            order.createdBy.id;
    },
    adminCanUpdate: (order: Order) => {
        return order.status !== 'cancel'
            && order.status !== 'change'
            && order.status !== 'done';
    }
};

export interface WithOrdersProps {
    readonly orders?: Order[];
}

// tslint:disable-next-line:no-any
export const withOrders = <T extends WithOrdersProps>(): any =>
    restfulDataContainer<Order, T, WithOrdersProps>({
        store: restfulStore,
        resourceType: orderResourceType,
        dataPropsKey: nameof<WithOrdersProps>(o => o.orders),
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
    });