import { ResourceType, Resource, restfulDataContainer, RecordType } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { ProductModule } from './productModule';
import { ProductType } from './productType';
import { ProductDesign } from './productDesign';

export interface OrderDetail extends RecordType {
    readonly id?: string;
    readonly quantity: number;
    readonly productModules: ProductModule[];
    readonly productType: ProductType;
    readonly design: ProductDesign;
    readonly subTotalPrice: number;
    readonly totalPrice: number;
}

export const orderDetailResourceType = new ResourceType({
    name: 'orderDetail',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const orderDetailResources = {
    find: new Resource<OrderDetail[]>({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.mapRecord(resourceType, item);
            }
        }
    }),
    create: new Resource({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail'),
        method: 'POST',
        mapDataToStore: (item, resourceType, store) => {
            store.mapRecord(resourceType, item);
        }
    })
};

export interface WithTempOrderDetails {
    readonly orderDetails: OrderDetail[];
}

export const withTempOrderDetails = (store) => (Component) =>
    restfulDataContainer<OrderDetail, WithTempOrderDetails>({
        resourceType: orderDetailResourceType,
        store: store,
        mapToProps: (data) => {
            return {
                orderDetails: data
            };
        }
    });