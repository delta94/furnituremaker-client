import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { AntdForm, AntdInput, AntdTextAreaProps } from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: AntdTextAreaProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderTextArea(props: RenderInputField) {
    const { input, meta, inputProps, label, required } = props;

    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdInput.TextArea
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                {...inputProps}
            />
        </AntdForm.Item>
    );
}