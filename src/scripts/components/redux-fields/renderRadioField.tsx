import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { AntdForm, AntdRadio, RadioGroupProps } from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: RadioGroupProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderRadioGroup(props: RenderInputField) {
    const { input, meta, inputProps, label, required } = props;

    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdRadio.Group
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                {...inputProps}
            />
        </AntdForm.Item>
    );
}