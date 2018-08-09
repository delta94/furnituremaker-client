import { Store } from 'react-restful';

import {
    productType,
    productTypeGroupResourceType,
    productDesign,
    furnitureComponentResourceType,
    furnitureComponentTypeResourceType,
    materialTypeResourceType,
    furnutureMaterialResouceType,
    discountByQuantitiesResourceType,
    userResourceType,
    orderDetailResourceType,
    orderResourceType
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