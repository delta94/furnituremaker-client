// tslint:disable:no-any
import * as Cascader from 'antd/lib/cascader';
import CascaderType, {
    CascaderOptionType as AntdCascaderOptionType,
    CascaderProps as AntdCascaderProps
} from 'antd/lib/cascader';

export {
    AntdCascaderProps,
    AntdCascaderOptionType
};
export const AntdCascader: typeof CascaderType = Cascader as any;