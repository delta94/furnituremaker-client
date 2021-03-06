import Radio from 'antd/lib/radio';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdButton,
    AntdCol,
    AntdRow,
    FormError,
    renderInput,
    renderInputNumber,
    renderRadioGroup
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
                            name={nameof<UserInfoFormValues>(o => o.email)}
                            component={renderInput}
                            label="Email"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập email',
                                disabled: true
                            }}
                        />
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.fullName)}
                            component={renderInput}
                            label="Tên đầy đủ"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập tên đầy đủ'
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
                                    component={renderInputNumber}
                                    required={true}
                                    inputProps={{
                                        placeholder: 'Nhập ngày sinh',
                                        className: 'w-100'
                                    }}
                                />
                            </AntdCol>
                            <AntdCol span={8}>
                                <Field
                                    name={nameof<UserInfoFormValues>(o => o.monthOfBirth)}
                                    label="tháng"
                                    component={renderInputNumber}
                                    required={true}
                                    inputProps={{
                                        placeholder: 'nhập tháng',
                                        className: 'w-100'
                                    }}
                                />
                            </AntdCol>
                            <AntdCol span={8}>
                                <Field
                                    name={nameof<UserInfoFormValues>(o => o.yearOfBirth)}
                                    label="năm"
                                    component={renderInputNumber}
                                    required={true}
                                    inputProps={{
                                        placeholder: 'nhập năm',
                                        className: 'w-100'
                                    }}
                                />
                            </AntdCol>
                        </AntdRow>
                        <Field
                            name={nameof<UserInfoFormValues>(o => o.gender)}
                            component={renderRadioGroup}
                            label="Giới tính"
                            required={true}
                            inputProps={{
                                children: [
                                    <Radio key="male" value="male">Nam</Radio>,
                                    <Radio key="famale" value="famale">Nữ</Radio>
                                ]
                            }}
                        />
                    </AntdCol>
                </AntdRow>
                <AntdButton type="primary" htmlType="submit">Cập nhật</AntdButton>
            </Form>
        );
    }
}

export const UserInfoForm = reduxForm<UserInfoFormValues, UserInfoFormProps>({
    form: 'UserInfoForm'
})(UserInfoFormComponent);