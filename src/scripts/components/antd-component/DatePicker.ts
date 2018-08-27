// tslint:disable:no-any
import * as DatePicker from 'antd/lib/date-picker';
import DatePickerType from 'antd/lib/date-picker';
import {
    DatePickerProps as AntdDatePickerProps
} from 'antd/lib/date-picker/interface';

export { AntdDatePickerProps };

export const AntdDatePicker: typeof DatePickerType = DatePicker as any;