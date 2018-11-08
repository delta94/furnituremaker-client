import * as React from 'react';
import { SubmissionError } from 'redux-form';
import styled from 'styled-components';

import { AntdModal, fetchErrorHandler } from '@/components';
import { loginPath } from '@/configs';
import { restfulFetcher, userResources } from '@/restful';

import {
    ForgotPasswordForm,
    ForgotPasswordFormValue
} from './forgot-password-form';

const ForgotPasswordControlWrapper = styled.div`
    width: 100%;
    max-width: 340px;
`;

export interface ForgotPasswordControlProps {
}

export class ForgotPasswordControl extends React.PureComponent<ForgotPasswordControlProps> {
    public render() {
        return (
            <ForgotPasswordControlWrapper>
                <ForgotPasswordForm
                    onSubmit={this.onForgotPasswordSubmit}
                    initialValues={{
                        url: `${location.origin}/reset-password`
                    }}
                />
            </ForgotPasswordControlWrapper>
        );
    }

    readonly onForgotPasswordSubmit = async (values: ForgotPasswordFormValue) => {
        if (!values.email) {
            throw new SubmissionError({ _error: 'Vui lòng cung cấp email' });
        }

        try {
            await restfulFetcher.fetchResource(
                userResources.forgotPassword,
                [{
                    type: 'body',
                    value: values
                }]
            );

            AntdModal.success({
                title: 'Thành công',
                // tslint:disable-next-line:max-line-length
                content: 'Yêu cầu của bạn được thực hiện thành công, vui lòng kiểm tra email!',
                onOk: () => {
                    location.href = loginPath;
                }
            });
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }
}
