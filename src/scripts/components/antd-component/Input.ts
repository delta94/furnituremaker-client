// tslint:disable:no-any

// import 'antd/lib/input/style/css';
import * as Input from 'antd/lib/input';
import InputType from 'antd/lib/input';
export {
    InputProps as AntdInputProps,
    TextAreaProps as AntdTextAreaProps
} from 'antd/lib/input';

export const AntdInput: typeof InputType = Input as any;

import * as InputNumber from 'antd/lib/input-number';
import InputNumberType from 'antd/lib/input-number';
export { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';

export const AntdInputNumber: typeof InputNumberType = InputNumber as any;