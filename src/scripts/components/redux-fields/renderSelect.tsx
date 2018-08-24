import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { AntdForm } from '@/components/antd-component';

import {
    AntdSelect,
    AntdSelectOptionProps,
    AntdSelectProps
} from '../antd-component/Select';

interface RenderSelectField extends WrappedFieldProps {
    readonly items: AntdSelectOptionProps[];
    readonly selectProps: AntdSelectProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderSelectField(props: RenderSelectField) {
    const { input, meta, items, selectProps, label, required } = props;
    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdSelect
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                // tslint:disable-next-line:no-any
                onFocus={input.onFocus as any}
                // tslint:disable-next-line:no-any
                onBlur={input.onBlur as any}
                {...selectProps}
            >
                {
                    items.map(o => {
                        return (
                            <AntdSelect.Option
                                key={o.value}
                                value={o.value}
                            >
                                {o.title}
                            </AntdSelect.Option>
                        );
                    })
                }
            </AntdSelect>
        </AntdForm.Item>
    );
}