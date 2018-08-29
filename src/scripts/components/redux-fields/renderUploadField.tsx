import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { getToken, uploadEntry } from '@/configs';

import {
    AntdButton,
    AntdForm,
    AntdIcon,
    AntdMessage,
    AntdUpload,
    AntdUploadProps
} from '../antd-component';

interface RenderUploadFieldProps extends WrappedFieldProps {
    readonly uploadProps: AntdUploadProps;
    readonly required: boolean;
    readonly label: string;
}

export function renderUploadField(props: RenderUploadFieldProps) {
    const { input, meta, uploadProps, label, required } = props;

    const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

    return (
        <AntdForm.Item
            label={label}
            validateStatus={validateStatus}
            help={validateStatus && meta.error}
            required={required}
        >
            <AntdUpload
                name="files"
                headers={{
                    authorization: `Bearer ${getToken()}`,
                    'X-Requested-With': null
                }}
                action={uploadEntry}
                onChange={(info) => {
                    if (info.file.status === 'done') {
                        input.onChange(info.file);
                    } else if (info.file.status === 'error') {
                        AntdMessage.error(`${info.file.name} file upload failed.`);
                    }
                }}
                {...uploadProps}
            >
                <AntdButton>
                    <AntdIcon type="upload" /> {label}
                </AntdButton>
            </AntdUpload>
        </AntdForm.Item >
    );
}