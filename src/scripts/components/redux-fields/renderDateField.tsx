import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import {
    AntdDatePicker,
    AntdDatePickerProps,
    AntdForm
} from '../antd-component';

interface RenderDateFieldField extends WrappedFieldProps {
    readonly datePickerProps: AntdDatePickerProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderDatePickerField(props: RenderDateFieldField) {
    const { input, meta, datePickerProps, label, required } = props;

    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdDatePicker
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                {...datePickerProps}
            />
        </AntdForm.Item>
    );
}