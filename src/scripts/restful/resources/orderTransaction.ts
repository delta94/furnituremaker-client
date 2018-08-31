import { Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/apiEntry';

import { Order } from './order';

export interface OrderTransaction {
    readonly id?: string;
    readonly name: string;
    readonly type: 'deposit' | 'payment' | 'refund';
    readonly note: string;
    readonly date: string;
    readonly order: Order;
}

export const orderTransactionType = new ResourceType<OrderTransaction>({
    name: nameof<Order>(),
    schema: [{
        field: 'id',
        type: 'PK'
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
    craete: new Resource<OrderTransaction>({
        resourceType: orderTransactionType,
        url: apiEntry('/orderTransaction'),
        method: 'POST',
        mapDataToStore: (orderTransaction, resourceType, store) => {
            store.mapRecord(resourceType, orderTransaction);
        }
    })
};