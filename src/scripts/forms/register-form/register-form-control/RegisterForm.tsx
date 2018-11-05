import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdButton,
    AntdIcon,
    AntdSteps,
    FormError,
    renderInput
} from '@/components';
import { User } from '@/restful';

export interface RegisterFormProps {

}

export interface RegisterFormValue extends User {
    readonly password: string;
    readonly rePassword: string;
}

class RegisterFormComponent extends React.PureComponent<
    InjectedFormProps<RegisterFormValue, RegisterFormProps>
    > {
    public render() {
        const { handleSubmit, error, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 15 }}>
                    <AntdSteps direction="vertical" size="small" current={0}>
                        <AntdSteps.Step title="Đăng ký" description="Tạo tài khoản đăng nhập" />
                        <AntdSteps.Step title="Xác thực" description="Cung cấp thông tin kinh doanh" />
                    </AntdSteps>
                </div>
                <FormError error={error} />
                <Field
                    name={nameof<RegisterFormValue>(o => o.email)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Email',
                        size: 'large',
                        prefix: <AntdIcon type="mail" />
                    }}
                />
                <Field
                    name={nameof<RegisterFormValue>(o => o.username)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Tên đăng nhập',
                        size: 'large',
                        prefix: <AntdIcon type="user" />
                    }}
                />
                <Field
                    name={nameof<RegisterFormValue>(o => o.password)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Mật khẩu',
                        size: 'large',
                        prefix: <AntdIcon type="lock" />,
                        type: 'password'
                    }}
                />
                <Field
                    name={nameof<RegisterFormValue>(o => o.rePassword)}
                    component={renderInput}
                    inputProps={{
                        placeholder: 'Nhập lại mật khẩu',
                        size: 'large',
                        prefix: <AntdIcon type="lock" />,
                        type: 'password'
                    }}
                />
                <p style={{ fontSize: 13 }}>Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng</p>
                <div style={{ textAlign: 'right' }}>
                    <AntdButton loading={submitting} htmlType="submit">Đăng ký</AntdButton>
                </div>
            </Form>
        );
    }
}

export const RegisterForm = reduxForm<RegisterFormValue>({
    form: 'RegisterForm'
})(RegisterFormComponent);
