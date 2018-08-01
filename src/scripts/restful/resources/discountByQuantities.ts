import { ResourceType, Resource } from 'react-restful';
import { Product, productUtils } from './_product';
import { apiEntry } from '@/restful/apiEntry';
import { ProductType } from '@/restful/resources/productType';
import { formatCurrency } from '@/utilities';

export interface DiscountByQuantities {
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
    find: new Resource<DiscountByQuantities[]>({
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
    format: (discountByQuantities: DiscountByQuantities, product: Product) => {
        const { quantity, discountPerProduct } = discountByQuantities;
        const price =  Math.abs(productUtils.getOriginPrice(product) - (discountPerProduct));
        return `mua ${quantity} - ${formatCurrency(price)}/cái`;
    }
};