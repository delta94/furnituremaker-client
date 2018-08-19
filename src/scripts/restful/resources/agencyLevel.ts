import { RecordType } from 'react-restful';

export interface AgencyLevel extends RecordType {
    readonly id?: number;
    readonly name: string;
}