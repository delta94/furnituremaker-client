import * as React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdButton,
    AntdCol,
    AntdRow,
    FormError,
    renderInput
} from '@/components';
import { loginPath } from '@/configs';

export interface ForgotPasswordFormValue {
    readonly email: string;
    readonly url: string;
}

export interface ForgotPasswordFormProps {

}

class ForgotPasswordFormComponent extends React.PureComponent<
    InjectedFormProps<ForgotPasswordFormValue, ForgotPasswordFormProps> & ForgotPasswordFormProps> {
    public render() {
        const { submitting, handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <p>Vui lòng cho biết email của bạn</p>
                <FormError error={error} />
                <Field
                    name={nameof<ForgotPasswordFormValue>(o => o.email)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Nhập email',
                        size: 'large',
                        type: 'email'
                    }}
                />
                <AntdRow>
                    <AntdCol span={12}>
                        <Link
                            to={loginPath}
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Về trang đăng nhập
                        </Link>
                    </AntdCol>
                    <AntdCol span={12}>
                        <div style={{ textAlign: 'right' }}>
                            <AntdButton
                                loading={submitting}
                                htmlType="submit"
                            >
                                Gởi
                            </AntdButton>
                        </div>
                    </AntdCol>
                </AntdRow>
            </Form>
        );
    }
}

export const ForgotPasswordForm = reduxForm<ForgotPasswordFormValue>({
    form: 'ForgotPasswordFormComponent'
})(ForgotPasswordFormComponent);
