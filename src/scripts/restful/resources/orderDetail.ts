import {
    RecordType,
    Resource,
    ResourceParameter,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';
import { roundTo } from '@/utilities';

import { Order } from './order';
import { Product } from './product';
import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { User } from './user';

export interface OrderDetail extends RecordType {
    readonly id?: string;
    readonly quantity: number;
    readonly productModulesCode: string;
    readonly productType: ProductType | string;
    readonly design: ProductDesign | string;
    readonly subTotalPrice: number;
    readonly totalPrice: number;
    readonly productPrice: number;
    readonly discountMoneyByInventoryProduct?: number;
    readonly discountPercentByInventoryProduct?: number;
    readonly totalDiscountPerProduct: number;
    readonly order?: Order;
    readonly status: 'temp' | 'order';
    readonly discount: number;
    readonly previewImg?: string;
    readonly createdBy?: User;
    readonly productCode?: string;
    readonly product?: Product;
    readonly updatedAt?: string;
}

export const orderDetailResourceType = new ResourceType<OrderDetail>({
    store: restfulStore,
    name: nameof<OrderDetail>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }, {
        resourceType: nameof<Order>(),
        field: nameof<OrderDetail>(o => o.order),
        type: 'FK'
    }, {
        resourceType: nameof<ProductType>(),
        field: nameof<OrderDetail>(o => o.productType),
        type: 'FK'
    }]
});

export const orderDetailResources = {
    find: new Resource<OrderDetail[]>({
        resourceType: orderDetailResourceType,
        url: apiEntry('/orderDetail'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            const orderRecordType = store.getRegisteredResourceType(nameof<Order>());
            for (const item of items) {
                if (item.order) {
                    store.mapRecord(orderRecordType, item.order);
                }
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
    getTempOrderParameter: () => ({
        type: 'query',
        parameter: 'status',
        value: 'temp'
    } as ResourceParameter),
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
            totalDiscountPerProduct: discountPerProduct,
            subTotalPrice: nextSubTotalPrice,
            discount: nextTotalDiscount,
            totalPrice: nextTotalPrice,
        };

        return updateOrderDetail;
    },
    getTotalOfPayment: (orderDetails: OrderDetail[]) => {
        return orderDetails.reduce(
            (currentValue, orderDetail) => {
                return currentValue + orderDetail.totalPrice;
            },
            0
        );
    },
    getTotalPrice: (orderDetails: OrderDetail[]) => {
        return orderDetails.reduce(
            (currentValue, orderDetail) => {
                return currentValue + orderDetail.subTotalPrice;
            },
            0
        );
    },
    getTotalDiscount: (orderDetails: OrderDetail[]) => {
        return orderDetails.reduce(
            (currentValue, orderDetail) => {
                return currentValue + orderDetail.discount;
            },
            0
        );
    },
    getTotalVolume: (orderDetails) => orderDetails.reduce(
        (totalVolumeValue, orderDetail) => {
            if (!orderDetail.productType) {
                return totalVolumeValue;
            }
            const orderDetailVolume = orderDetail.productType.volume * (orderDetail.quantity || 0);
            return totalVolumeValue += roundTo(orderDetailVolume, 2);
        },
        0
    )
};

export interface WithTempOrderDetails {
    readonly orderDetails?: OrderDetail[];
}

// tslint:disable-next-line:no-any
export const withTempOrderDetails = <T extends WithTempOrderDetails>(): any =>
    restfulDataContainer<OrderDetail, T, WithTempOrderDetails>({
        resourceType: orderDetailResourceType,
        store: restfulStore,
        mapToProps: (data) => {
            const orderDetails = data.filter(o => {
                return !o.order;
            });

            return { orderDetails };
        }
    });