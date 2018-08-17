import { Store } from 'react-restful';

import { promotionResourceType } from '@/restful/resources/promotion';

import {
    discountByQuantitiesResourceType,
    furnitureComponentResourceType,
    furnitureComponentTypeResourceType,
    furnutureMaterialResouceType,
    materialTypeResourceType,
    orderDetailResourceType,
    orderResourceType,
    productDesign,
    productType,
    productTypeGroupResourceType,
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