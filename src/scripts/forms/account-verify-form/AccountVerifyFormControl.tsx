import * as React from 'react';
import { SubmissionError } from 'redux-form';

import { Auth } from '@/app';
import { AntdModal, fetchErrorHandler } from '@/components';

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
                    createdBy: Auth.instance.currentUser.id
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
