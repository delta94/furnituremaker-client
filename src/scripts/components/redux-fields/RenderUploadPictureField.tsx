import './RenderUploadPictureField.scss';

import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { Img } from '@/components/domain-components';
import { getToken } from '@/configs';
import { uploadEntry } from '@/configs/url';
import { UploadedFile } from '@/restful';

import {
    AntdForm,
    AntdIcon,
    AntdMessage,
    AntdUpload,
    AntdUploadProps
} from '../antd-component';

interface RenderUploadPictureFieldProps extends WrappedFieldProps {
    readonly uploadProps: AntdUploadProps;
    readonly required: boolean;
    readonly label: string;
}

interface RenderUploadPictureFieldState {
    readonly loading: boolean;
}

export class RenderUploadPictureField extends React.Component<
    RenderUploadPictureFieldProps,
    RenderUploadPictureFieldState> {

    constructor(props: RenderUploadPictureFieldProps) {
        super(props);

        const { input } = this.props;

        this.state = {
            loading: false
        };
    }

    render() {
        const { input, meta, uploadProps, label, required } = this.props;

        const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;

        const uploadButton = (
            <div>
                <AntdIcon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Tải lên</div>
            </div>
        );

        const file = input.value as UploadedFile;

        return (
            <AntdForm.Item
                label={label}
                validateStatus={validateStatus}
                help={validateStatus && meta.error}
                required={required}
            >
                <AntdUpload
                    name="files"
                    accept="image/*"
                    listType="picture-card"
                    className="render-upload-picture-field"
                    showUploadList={false}
                    headers={{
                        authorization: `Bearer ${getToken()}`,
                        'X-Requested-With': null
                    }}
                    action={uploadEntry}
                    onChange={(info) => {
                        if (info.file.status === 'uploading') {
                            return void this.setState({
                                loading: true
                            });
                        }

                        if (info.file.status === 'error') {
                            AntdMessage.error(`${info.file.name} file upload failed.`);
                        } else if (info.file.status === 'done') {
                            this.setState(
                                { loading: false },
                                () => {
                                    const responseFile = info.file.response[0];
                                    if (responseFile) {
                                        input.onChange(responseFile);
                                    }
                                }
                            );
                        }
                    }}
                    {...uploadProps}
                >
                    {file ? <Img file={file} /> : uploadButton}
                </AntdUpload>
            </AntdForm.Item >
        );
    }
}