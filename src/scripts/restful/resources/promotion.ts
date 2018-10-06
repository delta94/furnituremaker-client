import { Record, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environment';

export interface Promotion extends Record {
    readonly id?: string;
    readonly code: string;
    readonly quantity: number;
    readonly discountPrice: number;
    readonly discountPercent: number;
    readonly expirationDate: string;
    readonly enabled?: boolean;
}

export const promotionResourceType = new ResourceType<Promotion>({
    store: restfulStore,
    name: nameof<Promotion>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const promotionResources = {
    find: new Resource<Promotion[]>({
        resourceType: promotionResourceType,
        url: apiEntry('/promotion'),
        method: 'GET',
        mapDataToStore: (promotions, resourceType, store) => {
            for (const promotion of promotions) {
                store.mapRecord(resourceType, promotion);
            }
        }
    }),
    findOne: new Resource<Promotion>({
        resourceType: promotionResourceType,
        url: apiEntry('/promotion/:id'),
        method: 'GET',
        mapDataToStore: (promotion, resourceType, store) => {
            store.mapRecord(resourceType, promotion);
        }
    })
};

export const promotionUtils = {
    getDiscount: (promotion: Promotion) => {
        if (!promotion) {
            return 0;
        }

        return promotion.discountPrice;
    }
};