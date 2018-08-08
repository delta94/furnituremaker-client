import { ResourceType, Resource } from 'react-restful';
import { Product, productUtils } from './_product';
import { apiEntry } from '@/restful/apiEntry';
import { ProductType } from '@/restful/resources/productType';
import { formatCurrency } from '@/utilities';

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
        const price =  Math.abs(productUtils.getOriginPrice(product) - (discountPerProduct));
        return `mua ${quantity} - ${formatCurrency(price)}/cái`;
    },
    getDiscountValue: (discountByQuantities: DiscountByQuantity[], quantity: number) => {
        const entity = discountByQuantities.find(o => o.quantity === quantity);
        return entity.discountPerProduct;
    }
};