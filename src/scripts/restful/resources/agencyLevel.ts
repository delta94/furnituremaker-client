import { Record } from 'react-restful';

export interface AgencyLevel extends Record {
    readonly id?: number;
    readonly name: string;
    readonly discountPercent: number;
}