import { Resource, ResourceType, withRestfulData } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

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
    store: restfulStore,
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

// tslint:disable-next-line:no-any
export const withProductDiscounts = <T extends WithProductDiscounts>(): any =>
    withRestfulData<ProductDiscount, WithProductDiscounts, T>({
        store: restfulStore,
        resourceType: productDiscountResourceType,
        mapToProps: (data, p) => {
            return {
                productDiscounts: data
            };
        }
    });