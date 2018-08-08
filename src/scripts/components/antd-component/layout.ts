// tslint:disable:no-any

import * as Row from 'antd/lib/row';
import * as Col from 'antd/lib/col';

import RowType from 'antd/lib/row';
import ColType from 'antd/lib/col';

// import 'antd/lib/row/style/css';
// import 'antd/lib/col/style/css';

export const AntdRow: typeof RowType = Row as any;
export const AntdCol: typeof ColType = Col as any;

import * as Layout from 'antd/lib/layout';
import LayoutType from 'antd/lib/layout';

export const AntdLayout: typeof LayoutType = Layout as any;