// tslint:disable:no-any
import './Table.scss';

import * as Table from 'antd/lib/table';
import { ColumnProps } from 'antd/lib/table';

export type AntdColumnProps<T> = ColumnProps<T>;
export const AntdTable: typeof Table['default'] = Table as any;