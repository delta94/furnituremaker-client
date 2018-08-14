import * as React from 'react';
import { Resource, ResourceType, restfulDataContainer } from 'react-restful';

import { formatCurrency } from '@/utilities';

import { apiEntry } from '../apiEntry';
import { Product, productUtils } from './_product';
import { ProductType } from './productType';

const sortBy = require('lodash/sortBy');

export interface DiscountByQuantity {
    readonly id?: string;
    readonly discountPerProduct: number;
    readonly quantity: number;
    readonly productType: ProductType;
}

export const discountByQuantitiesResourceType = new ResourceType({
    name: 'discountByQuantity',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const discountByQuantitiesResources = {
    find: new Resource<DiscountByQuantity[]>({
        resourceType: discountByQuantitiesResourceType,
        url: apiEntry('/discountByQuantity'),
        method: 'GET',
        mapDataToStore: (items, resourceType, store) => {
            for (const item of items) {
                store.dataMapping(resourceType, item);
            }
        }
    })
};

export const discountByQuantitiesUtils = {
    format: (discountByQuantity: DiscountByQuantity, product: Product) => {
        const { quantity, discountPerProduct } = discountByQuantity;
        const rawPrice = productUtils.getOriginPrice(product) - (discountPerProduct);
        const price = Math.abs(rawPrice);
        return `mua ${quantity} - ${formatCurrency(price)}/cái`;
    },
    getDiscountValue: (
        discountByQuantities: DiscountByQuantity[] = [],
        quantity: number = 0
    ) => {
        if (!discountByQuantities.length) {
            return 0;
        }

        const entity = discountByQuantities.find(o => o.quantity === quantity);
        if (!entity) {
            const sortedDiscountByQuantities =
                discountByQuantitiesUtils.sort(discountByQuantities).reverse();
            
            for (const discountByQuantity of sortedDiscountByQuantities) {
                if (
                    quantity > discountByQuantity.quantity ||
                    quantity === discountByQuantity.quantity
                ) {
                    return discountByQuantity.discountPerProduct;
                }
            }
            return 0;
        }
        return entity.discountPerProduct;
    },
    sort: (discountByquantities: DiscountByQuantity[]) => {
        return sortBy(
            discountByquantities,
            nameof<DiscountByQuantity>(o => o.quantity)
        );
    }
};

export interface WithDiscountByQuantitiesOwnProps {
    readonly productType: ProductType;
}

export interface WithDiscountByQuantities {
    readonly discountByQuantities?: DiscountByQuantity[];
}

export const withDiscountByQuantities = (store) =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<WithDiscountByQuantities>): any =>
        restfulDataContainer<DiscountByQuantity, WithDiscountByQuantities>({
            store: store,
            resourceType: discountByQuantitiesResourceType,
            mapToProps: (data, ownProps: WithDiscountByQuantitiesOwnProps) => {
                const { productType } = ownProps;
                if (!productType) {
                    return {
                        discountByQuantities: data
                    };
                }

                const discountByQuantities = data.filter(o => o.productType.id === productType.id);
                return {
                    discountByQuantities: discountByQuantities
                };
            }
        })(Component);