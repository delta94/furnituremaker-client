import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import styled from 'styled-components';

import { AntdInput, AntdMessage, AntdUpload } from '@/components';
import { getToken, uploadEntry } from '@/configs';
import { UploadedFile } from '@/restful';

const BussinessLicenseFieldWrapper = styled.div`
    display: flex;
    margin-bottom: 15px;
    > div:first-child {
        flex-grow: 1;
        margin-right: 5px;
    }

    .bussiness-license-upload-btn {
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        img {
            height: 40px;
        }
    }
`;

export interface BussinessLicenseFieldProps {

}

export class BussinessLicenseField extends React.PureComponent<BussinessLicenseFieldProps & WrappedFieldProps> {
    public render() {
        const { input } = this.props;
        return (
            <BussinessLicenseFieldWrapper>
                <div>
                    <AntdInput
                        value={input.value && (input.value as UploadedFile).name}
                        placeholder="Đính kèm giấy phép kinh doanh"
                        disabled={true}
                        size="large"
                    />
                </div>
                <div>
                    <AntdUpload
                        name="files"
                        headers={{
                            authorization: `Bearer ${getToken()}`,
                            'X-Requested-With': null
                        }}
                        action={uploadEntry}
                        onChange={(info) => {
                            if (info.file.status === 'done') {
                                input.onChange(info.file.response[0]);
                            } else if (info.file.status === 'error') {
                                AntdMessage.error(`${info.file.name} file upload failed.`);
                            }
                        }}
                        showUploadList={false}
                    >
                        <button type="button" className="bussiness-license-upload-btn">
                            <img src="/static/assets/attach-file.png" />
                        </button>
                    </AntdUpload>
                </div>
            </BussinessLicenseFieldWrapper>
        );
    }
}
