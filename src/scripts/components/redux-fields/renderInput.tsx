import * as React from 'react';

import { WrappedFieldProps } from 'redux-form';
import {
    AntdInput,
    AntdInputProps
} from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: AntdInputProps;
}

export function renderInput(props: RenderInputField) {
    const { input, inputProps } = props;
    return (
        <AntdInput
            value={input.value ? input.value : undefined}
            onChange={input.onChange}
            {...inputProps}
        />
    );
}