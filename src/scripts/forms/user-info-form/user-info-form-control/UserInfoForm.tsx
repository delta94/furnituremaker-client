import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdCol,
    AntdRow,
    FormError,
    renderInput,
    RenderUploadPictureField
} from '@/components';
import { User } from '@/restful';

export interface UserInfoFormProps {

}

export interface UserInfoFormValues extends User {
}

class UserInfoFormComponent extends React.Component<
    UserInfoFormProps &
    InjectedFormProps<UserInfoFormValues, UserInfoFormProps>
    > {
    render() {
        const { handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <AntdRow gutter={15}>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.username)}
                            component={renderInput}
                            label="Tên đăng nhập"
                            required={true}
                            inputProps={{
                                disabled: true
                            }}
                        />
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.name)}
                            component={renderInput}
                            label="Tên đầy đủ"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập tên đầy đủ'
                            }}
                        />
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.email)}
                            component={renderInput}
                            label="Email"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập email'
                            }}
                        />
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.phone)}
                            component={renderInput}
                            label="Số điện thoại"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập số điện thoại'
                            }}
                        />
                        <AntdRow gutter={10}>
                            <AntdCol span={8}>
                                <Field
                                    name={nameof<UserInfoFormValues>(o => o.dayOfBirth)}
                                    label="ngày sinh"
                                    component={renderInput}
                                    required={true}
                                />
                            </AntdCol>
                            <AntdCol span={8}>
                                <Field
                                    name={nameof<UserInfoFormValues>(o => o.monthOfBirth)}
                                    label="tháng"
                                    component={renderInput}
                                    required={true}
                                />
                            </AntdCol>
                            <AntdCol span={8}>
                                <Field
                                    name={nameof<UserInfoFormValues>(o => o.monthOfBirth)}
                                    label="năm"
                                    component={renderInput}
                                    required={true}
                                />
                            </AntdCol>
                        </AntdRow>
                    </AntdCol>
                </AntdRow>
            </Form>
        );
    }
}

export const UserInfoForm = reduxForm<UserInfoFormValues, UserInfoFormProps>({
    form: 'UserInfoForm'
})(UserInfoFormComponent);