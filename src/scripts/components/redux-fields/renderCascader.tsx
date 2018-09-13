import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import {
    AntdCascader,
    AntdCascaderProps,
    AntdForm
} from '@/components/antd-component';

interface RenderSelectField extends WrappedFieldProps {
    readonly cascaderProps: AntdCascaderProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderCascader(props: RenderSelectField) {
    const { input, meta, cascaderProps, label, required } = props;
    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdCascader
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                {...cascaderProps}
            />
        </AntdForm.Item>
    );
}