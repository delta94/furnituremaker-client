import { RecordType } from 'react-restful';

export interface County extends RecordType {
    readonly id?: string;
    readonly name: string;
}