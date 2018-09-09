import { Store } from 'react-restful';

import {
    agencyResourceType,
    cityResourceType,
    countyResourceType,
    discountByQuantitiesResourceType,
    furnitureComponentResourceType,
    furnitureComponentTypeResourceType,
    furnutureMaterialResouceType,
    materialTypeResourceType,
    orderDetailResourceType,
    orderResourceType,
    orderTransactionType,
    productDesign,
    productDiscountResourceType,
    productResourceType,
    productType,
    productTypeGroupResourceType,
    promotionResourceType,
    userResourceType
} from './resources';

export const restfulStore = new Store();

restfulStore.registerRecordType(productTypeGroupResourceType);
restfulStore.registerRecordType(productType);
restfulStore.registerRecordType(productDesign);
restfulStore.registerRecordType(furnitureComponentTypeResourceType);
restfulStore.registerRecordType(furnitureComponentResourceType);
restfulStore.registerRecordType(furnutureMaterialResouceType);
restfulStore.registerRecordType(materialTypeResourceType);
restfulStore.registerRecordType(discountByQuantitiesResourceType);
restfulStore.registerRecordType(userResourceType);
restfulStore.registerRecordType(orderDetailResourceType);
restfulStore.registerRecordType(orderResourceType);
restfulStore.registerRecordType(promotionResourceType);
restfulStore.registerRecordType(cityResourceType);
restfulStore.registerRecordType(countyResourceType);
restfulStore.registerRecordType(agencyResourceType);
restfulStore.registerRecordType(orderTransactionType);
restfulStore.registerRecordType(productResourceType);
restfulStore.registerRecordType(productDiscountResourceType);