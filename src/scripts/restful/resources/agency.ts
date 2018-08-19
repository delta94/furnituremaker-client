import { RecordType } from 'react-restful';

import { AgencyLevel } from './agencyLevel';
import { User } from './user';

export interface Agency extends RecordType {
    readonly id?: number;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly level: AgencyLevel;
    readonly user: User;
}