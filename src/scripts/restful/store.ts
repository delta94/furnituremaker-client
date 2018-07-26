import { Store } from 'react-restful';

import {
    productType, productTypeGroup, productDesign
} from './resources';

export const restfulStore = new Store();

restfulStore.registerRecordType(productTypeGroup);
restfulStore.registerRecordType(productType);
restfulStore.registerRecordType(productDesign);