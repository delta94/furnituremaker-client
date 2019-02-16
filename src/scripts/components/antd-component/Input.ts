// tslint:disable:no-any
// import 'antd/lib/input/style/css';
import * as Input from 'antd/lib/input';
import InputType from 'antd/lib/input';
import * as InputNumber from 'antd/lib/input-number';
import InputNumberType from 'antd/lib/input-number';

export {
    InputProps as AntdInputProps,
    TextAreaProps as AntdTextAreaProps
} from 'antd/lib/input';

export const AntdInput: typeof InputType = Input.default as any;

export { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';

export const AntdInputNumber: typeof InputNumberType = InputNumber.default as any;