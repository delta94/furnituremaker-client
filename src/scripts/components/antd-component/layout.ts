import * as Col from 'antd/lib/col';
import ColType from 'antd/lib/col';
import * as Layout from 'antd/lib/layout';
import LayoutType from 'antd/lib/layout';
// tslint:disable:no-any
import * as Row from 'antd/lib/row';
import RowType from 'antd/lib/row';

// import 'antd/lib/row/style/css';
// import 'antd/lib/col/style/css';

export const AntdRow: typeof RowType = Row.default as any;
export const AntdCol: typeof ColType = Col.default as any;

export const AntdLayout: typeof LayoutType = Layout.default as any;