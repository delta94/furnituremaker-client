import * as React from 'react';

import { WrappedFieldProps } from 'redux-form';
import {
    AntdInput,
    AntdTextAreaProps
} from '../antd-component';

interface RenderInputField extends WrappedFieldProps {
    readonly inputProps: AntdTextAreaProps;
}

export function renderTextArea(props: RenderInputField) {
    const { input, inputProps } = props;
    return (
        <AntdInput.TextArea
            value={input.value ? input.value : undefined}
            onChange={input.onChange}
            {...inputProps}
        />
    );
}