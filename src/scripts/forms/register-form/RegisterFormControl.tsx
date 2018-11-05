import * as React from 'react';
import { SubmissionError } from 'redux-form';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdModal, AntdMotification, fetchErrorHandler } from '@/components';
import { CommonStoreProps } from '@/configs';
import { restfulFetcher, userResources } from '@/restful';

import { RegisterForm, RegisterFormValue } from './register-form-control';

const RegisterFormControlWrapper = styled.div`
    width: 100%;
    max-width: 340px;
    .ant-form-item {
        margin-bottom: 10px;
    }
    
    .ant-btn {
        background: #FFFFFF;
        border-radius: 5px;
        color: #000;
        border-width: 0;
        padding: 0 20px;
    }

    .ant-alert {
        margin-bottom: 10px!important;
    }
`;

export interface RegisterFormControlProps {
}

export class RegisterFormControl extends React.PureComponent<RegisterFormControlProps> {
    public render() {
        return (
            <RegisterFormControlWrapper>
                <RegisterForm
                    onSubmit={this.onRegisterSubmit}
                    initialValues={{
                        gender: 'male'
                    }}
                />
            </RegisterFormControlWrapper>
        );
    }

    readonly onRegisterSubmit = async (values: RegisterFormValue) => {
        let error: string;

        if (!values.email) {
            error = 'Vui lòng nhập Email';
        } else if (!values.username) {
            error = 'Vui lòng nhập tên đăng nhập';
        } else if (!values.password) {
            error = 'Vui lòng nhập mật khẩu';
        } else if (values.password !== values.rePassword) {
            error = 'Mật khẩu không trùng khớp';
        }

        if (error) {
            throw new SubmissionError({ _error: error });
        }

        try {
            const newUser = await restfulFetcher.fetchResource(
                userResources.register,
                [{
                    type: 'body',
                    value: values
                }]
            );

            AntdModal.success({
                title: 'Tạo tài khoản',
                content: 'Để hoàn tất quá trình đăng ký, xin vui lòng cung cấp thông tin kinh doanh của bạn.',
                onOk: () => location.href = '/account-verify'
            });

        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }
}
