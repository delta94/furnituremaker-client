import * as React from 'react';
import { SubmissionError } from 'redux-form';
import styled from 'styled-components';

import { AccountFormWrapper, AntdModal, fetchErrorHandler } from '@/components';
import { loginPath } from '@/configs';
import { restfulFetcher, userResources } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import {
    ResetPasswordForm,
    ResetPasswordFormValue
} from './reset-password-form';

export interface ResetPasswordControlProps {
}

export class ResetPasswordControl extends React.PureComponent<ResetPasswordControlProps> {
    public render() {
        const code = getUrlSearchParam('code', location.search);
        return (
            <AccountFormWrapper>
                <ResetPasswordForm
                    onSubmit={this.onResetPasswordSubmit}
                    initialValues={{
                        code: code
                    }}
                />
            </AccountFormWrapper>
        );
    }

    readonly onResetPasswordSubmit = async (values: ResetPasswordFormValue) => {
        if (!values.password) {
            throw new SubmissionError({ _error: 'Vui lòng cung cấp email' });
        } else if (values.password !== values.passwordConfirmation) {
            throw new SubmissionError({ _error: 'Mật khẩu nhập lại ko trùng khớp' });
        }

        try {
            await restfulFetcher.fetchResource(
                userResources.resetPassword,
                [{
                    type: 'body',
                    value: values
                }]
            );

            AntdModal.success({
                title: 'Thành công',
                content: 'Mật khẩu của bạn đã được thay đổi, vui lòng đăng nhập lại!',
                onOk: () => {
                    location.href = loginPath;
                }
            });
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }
}
