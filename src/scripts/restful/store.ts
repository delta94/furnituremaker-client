import { Store } from 'react-restful';

import {
    productType,
    productTypeGroup,
    productDesign,
    furnitureComponentResourceType,
    furnitureComponentTypeResourceType
} from './resources';

export const restfulStore = new Store();

restfulStore.registerRecordType(productTypeGroup);
restfulStore.registerRecordType(productType);
restfulStore.registerRecordType(productDesign);
restfulStore.registerRecordType(furnitureComponentTypeResourceType);
restfulStore.registerRecordType(furnitureComponentResourceType);