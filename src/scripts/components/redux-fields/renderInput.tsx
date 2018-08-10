import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { AntdForm, AntdInput, AntdInputProps } from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: AntdInputProps;
}

export function renderInput(props: RenderInputField) {
    const { input, meta, inputProps, label } = props;

    // tslint:disable-next-line:no-any
    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
        >
            <AntdInput
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                {...inputProps}
            />
        </AntdForm.Item>
    );
}