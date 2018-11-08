import * as React from 'react';
import { SubmissionError } from 'redux-form';
import styled from 'styled-components';

import { Auth } from '@/app';
import { AccountFormWrapper, AntdModal, fetchErrorHandler } from '@/components';
import { saveToken } from '@/configs';
import { restfulFetcher, userResources } from '@/restful';

import { RegisterForm, RegisterFormValue } from './register-form-control';

export interface RegisterFormControlProps {
}

export class RegisterFormControl extends React.PureComponent<RegisterFormControlProps> {
    public render() {
        return (
            <AccountFormWrapper>
                <RegisterForm
                    onSubmit={this.onRegisterSubmit}
                    initialValues={{
                        gender: 'male'
                    }}
                />
            </AccountFormWrapper>
        );
    }

    readonly onRegisterSubmit = async (values: RegisterFormValue) => {
        let error: string;
        if (!values.fullName) {
            error = 'Vui lòng cho biết tiên của bạn';
        } else if (!values.email) {
            error = 'Vui lòng nhập Email';
        } else if (!values.email) {
            error = 'Vui lòng nhập số điện thoại';
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
            const { jwt } = await restfulFetcher.fetchResource(
                userResources.register,
                [{
                    type: 'body',
                    value: values
                }]
            );

            AntdModal.success({
                title: 'Tạo tài khoản',
                // tslint:disable-next-line:max-line-length
                content: 'Để hoàn tất quá trình đăng ký, xin vui lòng cung cấp thông tin kinh doanh của bạn ở bước kế tiếp.',
                onOk: () => {
                    saveToken(jwt, true);
                    location.href = '/account-verify';
                }
            });
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }
}
