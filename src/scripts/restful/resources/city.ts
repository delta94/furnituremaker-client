import { RecordType } from 'react-restful';

import { County } from './county';

export interface City extends RecordType {
    readonly id?: string;
    readonly name: string;
    readonly counties: County[];
}