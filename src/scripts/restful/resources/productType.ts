import { ResourceType, Resource, RecordType } from 'react-restful';
import { apiEntry } from '../apiEntry';

export interface ProductType extends RecordType {
    id: string;
    name: string;
}

export const productType = new ResourceType({
    name: 'product-type',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productTypeResources = {
    find: new Resource<ProductType[]>({
        resourceType: productType,
        url: apiEntry('/producttypegroup'),
        method: 'GET',
        mapDataToStore: (customers, resourceType, store) => {
            for (const customer of customers) {
                store.dataMapping(resourceType, customer);
            }
        }
    })
};