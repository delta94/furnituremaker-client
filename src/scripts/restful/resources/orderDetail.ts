import { ResourceType, Resource, restfulDataContainer, RecordType, ResourceParameter } from 'react-restful';

import { apiEntry } from '../apiEntry';

import { ProductType } from './productType';
import { ProductDesign } from './productDesign';

export interface OrderDetail extends RecordType {
    readonly id?: string;
    readonly quantity: number;
    readonly productCode: string;
    readonly productType: ProductType;
    readonly design: ProductDesign;
    readonly subTotalPrice: number;
    readonly totalPrice: number;
    readonly productPrice: number;
    readonly productDiscount: number;
    readonly order?: unknown;
    readonly status: 'temp' | 'order';
    readonly discount: number;
}

export const orderDetailResourceType = new ResourceType({
    name: nameof<OrderDetail>(),
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
    add: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail'),
        method: 'POST',
        mapDataToStore: (item, resourceType, store) => {
            store.mapRecord(resourceType, item);
        }
    }),
    update: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail/:id'),
        method: 'PUT',
        mapDataToStore: (item, resourceType, store) => {
            store.mapRecord(resourceType, item);
        }
    }),
    delete: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail/:id'),
        method: 'DELETE',
        mapDataToStore: (item, resourceType, store) => {
            store.removeRecord(resourceType, item);
        }
    }),
};

export const orderDetailUtils = {
    getTempOrderParameter: {
        type: 'query',
        parameter: 'status',
        value: 'temp'
    } as ResourceParameter,
    createUpdateParams: (orderDetail: OrderDetail): ResourceParameter[] => {
        return [{
            type: 'path',
            parameter: 'id',
            value: orderDetail.id
        }, {
            type: 'body',
            value: orderDetail
        }];
    },
    getQuantity: (orderDetails: OrderDetail[]) => {
        return orderDetails.reduce(
            (currentValue, orderDetail) => {
                const nextValue = currentValue += orderDetail.quantity;
                return nextValue;
            },
            0
        );
    },
    updateTheOrderDetail: (
        orderDetail: OrderDetail,
        quantity: number,
        discountPerProduct: number
    ) => {
        const nextSubTotalPrice = orderDetail.productPrice * quantity;
        const nextTotalDiscount = discountPerProduct * quantity;
        const nextTotalPrice = nextSubTotalPrice - nextTotalDiscount;

        const updateOrderDetail: OrderDetail = {
            ...orderDetail,
            quantity: quantity,
            productDiscount: discountPerProduct,
            subTotalPrice: nextSubTotalPrice,
            discount: nextTotalDiscount,
            totalPrice: nextTotalPrice,
        };

        return updateOrderDetail;
    },
    getTotalPrice: (orderDetails: OrderDetail[]) => {
        return orderDetails.reduce(
            (currentValue, orderDetail) => {
                return currentValue + orderDetail.totalPrice;
            },
            0
        );
    }
};

export interface WithTempOrderDetails {
    readonly orderDetails?: OrderDetail[];
}

export const withTempOrderDetails = (store) =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<WithTempOrderDetails>): any =>
        restfulDataContainer<OrderDetail, WithTempOrderDetails>({
            resourceType: orderDetailResourceType,
            store: store,
            mapToProps: (data) => {
                const orderDetails = data.filter(o => {
                    return !o.order;
                });

                return { orderDetails };
            }
        })(Component);