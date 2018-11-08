import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import { AntdButton, FormError, renderInput } from '@/components';

export interface ResetPasswordFormValue {
    readonly code: string;
    readonly password: string;
    readonly passwordConfirmation: string;
}

export interface ResetPasswordFormProps {
    
}

class ResetPasswordFormComponent extends React.PureComponent<
    InjectedFormProps<ResetPasswordFormValue, ResetPasswordFormProps> & ResetPasswordFormProps> {
    public render() {
        const { submitting, handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <p>Đặt lại mật khẩu cho tài khoản của bạn</p>
                <FormError error={error} />
                <Field
                    name={nameof<ResetPasswordFormValue>(o => o.password)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Nhập mật khẩu mới',
                        size: 'large',
                        type: 'Password'
                    }}
                />
                <Field
                    name={nameof<ResetPasswordFormValue>(o => o.passwordConfirmation)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Nhập lại mật khẩu',
                        size: 'large',
                        type: 'Password'
                    }}
                />
                <div style={{ textAlign: 'right' }}>
                    <AntdButton
                        loading={submitting}
                        htmlType="submit"
                    >
                        Đặt lại mật khẩu
                    </AntdButton>
                </div>
            </Form>
        );
    }
}

export const ResetPasswordForm = reduxForm<ResetPasswordFormValue>({
    form: 'ResetPasswordFormComponent'
})(ResetPasswordFormComponent);
