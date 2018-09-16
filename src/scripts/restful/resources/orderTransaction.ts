import { Resource, ResourceType, restfulDataContainer } from 'react-restful';

import { policies } from '@/app';
import { sendNotificationToFirebase } from '@/firebase';
import { apiEntry, restfulStore } from '@/restful/environment';
import { genCodeWithCurrentDate } from '@/utilities';

import { Order } from './order';

export interface OrderTransaction {
    readonly id?: string;
    readonly name: string;
    readonly type: 'deposit' | 'payment' | 'refund';
    readonly note: string;
    readonly date: string;
    readonly order: Partial<Order>;
    readonly money: number;
    readonly code: string;
}

export const orderTransactionType = new ResourceType<OrderTransaction>({
    store: restfulStore,
    name: nameof<OrderTransaction>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        resourceType: nameof<Order>(),
        field: nameof<OrderTransaction>(o => o.order),
        type: 'FK'
    }]
});

export const orderTransactionResources = {
    find: new Resource<OrderTransaction[]>({
        resourceType: orderTransactionType,
        url: apiEntry('/orderTransaction'),
        method: 'GET',
        mapDataToStore: (orderTransactions, resourceType, store) => {
            for (const orderTransaction of orderTransactions) {
                store.mapRecord(resourceType, orderTransaction);
            }
        }
    }),
    create: new Resource<OrderTransaction>({
        resourceType: orderTransactionType,
        url: apiEntry('/orderTransaction'),
        method: 'POST',
        afterFetch: (params, fetchResult) => {
            const isAdmin = policies.isAdminGroup();
            if (isAdmin) {
                const now = new Date();
                sendNotificationToFirebase(
                    fetchResult.order.createdBy,
                    {
                        type: 'new-order-transaction',
                        orderId: fetchResult.order.id,
                        orderRransactionId: fetchResult.id,
                        time: now.toISOString()
                    }
                );
            }
        },
        mapDataToStore: (orderTransaction, resourceType, store) => {
            store.mapRecord(resourceType, orderTransaction);
        }
    }),
    delete: new Resource<OrderTransaction>({
        resourceType: orderTransactionType,
        url: apiEntry('/orderTransaction/:id'),
        method: 'DELETE',
        mapDataToStore: (orderTransaction, resourceType, store) => {
            store.removeRecord(resourceType, orderTransaction);
        }
    })
};

export const orderTransactionUtils = {
    getTypeSelectItems: (): ReadonlyArray<{
        readonly value: OrderTransaction['type'];
        readonly title: string;
    }> => {
        return [{
            value: 'deposit',
            title: 'Đặt cọc'
        }, {
            value: 'payment',
            title: 'Thanh toán'
        }, {
            value: 'refund',
            title: 'Hoàn tiền'
        }];
    },
    getTypeTitle: (type: OrderTransaction['type']) => {
        const typeSelectIitems = orderTransactionUtils.getTypeSelectItems();
        const typeItem = typeSelectIitems.find(o => o.value === type);
        return typeItem.title;
    },
    genName: (orderTransaction: OrderTransaction) => {
        if (!orderTransaction.order) {
            return null;
        }

        const typeSelectIitems = orderTransactionUtils.getTypeSelectItems();

        const typeItem = typeSelectIitems.find(o => o.value === orderTransaction.type);
        const title = typeItem.title;

        return `${title} đơn hàng #${orderTransaction.order.id}`;
    },
    genCode: () => genCodeWithCurrentDate(),
    sumMoney: (orderTransactions: OrderTransaction[]) => {
        if (!orderTransactions) {
            return 0;
        }

        const result = orderTransactions.reduce(
            (currentValue, orderTransaction) => {
                if (orderTransaction.type === 'refund') {
                    return currentValue -= orderTransaction.money;
                }
                return currentValue += orderTransaction.money;
            },
            0
        );

        return result;
    }
};

export interface WithOrderTransactionProps {
    readonly orderTransactions?: OrderTransaction[];
}

export interface WithOrderTransactionOwnProps extends
    WithOrderTransactionProps {
    readonly order: Order;
}

// tslint:disable-next-line:no-any
export const withOrderTransactionsByOrder = <T extends WithOrderTransactionOwnProps>(): any =>
    restfulDataContainer<OrderTransaction, WithOrderTransactionProps, T>({
        store: restfulStore,
        resourceType: orderTransactionType,
        mapToProps: (data, ownProps) => {
            const orderTransactions = data.filter(orderTransaction => {
                if (typeof orderTransaction.order === 'string') {
                    return orderTransaction.order === ownProps.order.id;
                }
                return orderTransaction.order.id === ownProps.order.id;
            });

            return {
                orderTransactions
            };
        }
    });