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
}

export function renderSelectField(props: RenderSelectField) {
    const { input, meta, items, selectProps, label } = props;
    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
        >
            <AntdSelect
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
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