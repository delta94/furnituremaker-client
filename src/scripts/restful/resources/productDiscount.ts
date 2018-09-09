import {
    Resource,
    ResourceType,
    restfulDataContainer,
    Store
} from 'react-restful';

import { apiEntry } from '@/restful/apiEntry';

import { Product } from './product';

export interface ProductDiscount {
    readonly id?: string;
    readonly name: string;
    readonly discountMoney?: number;
    readonly discountPercent?: number;
    readonly products?: Product[];
    readonly enabled?: boolean;
}

export const productDiscountResourceType = new ResourceType<ProductDiscount>({
    name: nameof<ProductDiscount>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productDiscountResources = {
    find: new Resource<ProductDiscount[]>({
        resourceType: productDiscountResourceType,
        url: apiEntry('/productDiscount'),
        method: 'GET',
        mapDataToStore: (productDiscounts, resourceType, store) => {
            for (const productDiscount of productDiscounts) {
                store.mapRecord(resourceType, productDiscount);
            }
        }
    })
};

export const productDiscountUtils = {
    getDiscountByProduct: (productDiscounts: ProductDiscount[], product: Product) => {
        if (!productDiscounts || !product) {
            return null;
        }

        return productDiscounts.find((productDiscount) => {
            if (!productDiscount.products) {
                return false;
            }
            return productDiscount.products.find(o => o.id === product.id) !== undefined;
        });
    },
    getDiscountMoney: (productDiscount: ProductDiscount, product: Product) => {
        if (!productDiscount || !product) {
            return 0;
        }

        if (productDiscount.discountMoney) {
            return productDiscount.discountMoney;
        } else if (productDiscount.discountPercent) {
            return product.totalPrice * (productDiscount.discountPercent * 0.01);
        }
        
        return 0;
    }
};

export interface WithProductDiscounts {
    readonly productDiscounts?: ProductDiscount[];
}

export const withProductDiscounts = (store: Store) =>
    // tslint:disable-next-line:no-any
    (Component: React.ComponentType<WithProductDiscounts>): any =>
        restfulDataContainer<ProductDiscount, WithProductDiscounts>({
            store: store,
            resourceType: productDiscountResourceType,
            mapToProps: (data) => {
                return {
                    productDiscounts: data
                };
            }
        })(Component);