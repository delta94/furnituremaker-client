// tslint:disable:no-any

// import 'antd/lib/select/style/css';
import * as Select from 'antd/lib/select';
import SelectType, { OptionProps, SelectProps } from 'antd/lib/select';

export type AntdSelectOptionProps = OptionProps;
export type AntdSelectProps = SelectProps;

export const AntdSelect: typeof SelectType = Select as any;