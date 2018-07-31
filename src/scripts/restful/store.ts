import { Store } from 'react-restful';

import {
    productType,
    productTypeGroup,
    productDesign,
    furnitureComponentResourceType,
    furnitureComponentTypeResourceType,
    materialTypeResourceType,
    furnutureMaterialResouceType
} from './resources';

export const restfulStore = new Store();

restfulStore.registerRecordType(productTypeGroup);
restfulStore.registerRecordType(productType);
restfulStore.registerRecordType(productDesign);
restfulStore.registerRecordType(furnitureComponentTypeResourceType);
restfulStore.registerRecordType(furnitureComponentResourceType);
restfulStore.registerRecordType(furnutureMaterialResouceType);
restfulStore.registerRecordType(materialTypeResourceType);
