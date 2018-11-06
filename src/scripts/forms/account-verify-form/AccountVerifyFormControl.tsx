import * as React from 'react';
import { SubmissionError } from 'redux-form';

import { Auth } from '@/app';
import { AntdModal, fetchErrorHandler } from '@/components';
import { accountRequestResources, restfulFetcher } from '@/restful';

import {
    AccountVerifyForm,
    AccountVerifyFormValue
} from './register-form-control';

export interface RegisterFormControlProps {
}

export class AccountVerifyFormControl extends React.PureComponent<RegisterFormControlProps> {
    public render() {
        return (
            <AccountVerifyForm
                onSubmit={this.onRegisterSubmit}
                initialValues={{
                    createdBy: Auth.instance.currentUser
                }}
            />
        );
    }

    readonly onRegisterSubmit = async (values: AccountVerifyFormValue) => {
        let error: string;

        if (!values.companyName) {
            error = 'Vui lòng nhập tên công ty';
        } else if (!values.businessAreas) {
            error = 'Vui lòng cho biết lĩnh vực hoạt động';
        } else if (!values.businessLicense) {
            error = 'Vui lòng đính kèm giấy phép kinh doanh';
        }

        if (error) {
            throw new SubmissionError({ _error: error });
        }

        try {
            const newAccountRequest = await restfulFetcher.fetchResource(
                accountRequestResources.create,
                [{
                    type: 'body',
                    value: values
                }]
            );

            location.href = '/register-success';
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }
}