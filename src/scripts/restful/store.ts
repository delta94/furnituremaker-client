import { Store } from 'react-restful';

import {
    productType, productTypeGroup
} from './resources';

export const restfulStore = new Store();

restfulStore.registerRecordType(productTypeGroup);
restfulStore.registerRecordType(productType);