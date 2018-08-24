import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { AntdForm, AntdInputNumber, AntdInputProps } from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: AntdInputProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderInputNumber(props: RenderInputField) {
    const { input, meta, inputProps, label, required } = props;

    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdInputNumber
                // tslint:disable-next-line:no-any
                {...input as any}
                value={input.value ? input.value : undefined}
                {...inputProps}
            />
        </AntdForm.Item>
    );
}