import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdIcon,
    FormError,
    RegisterSteps,
    renderInput
} from '@/components';

const AccountVerifyFormControlWrapper = styled.div`
    width: 100%;
    max-width: 340px;
    .ant-form-item {
        margin-bottom: 10px;
    }
    
    .ant-btn {
        background: #FFFFFF;
        border-radius: 5px;
        color: #000;
        border-width: 0;
        padding: 0 20px;
    }

    .ant-alert {
        margin-bottom: 10px!important;
    }
`;

export interface AccountVerifyFormProps {

}

export interface AccountVerifyFormValue {
    readonly createdBy: string;
    readonly companyName: string;
    readonly businessAreas: string;
    readonly businessLicense: string;
}

class AccountVerifyFormComponent extends React.PureComponent<
    InjectedFormProps<AccountVerifyFormValue, AccountVerifyFormProps>
    > {
    public render() {
        const { handleSubmit, error, submitting } = this.props;
        return (
            <AccountVerifyFormControlWrapper>
                <Form onSubmit={handleSubmit}>
                    <RegisterSteps current={1} />
                    <FormError error={error} />
                    <Field
                        name={nameof<AccountVerifyFormValue>(o => o.companyName)}
                        component={renderInput}
                        inputProps={{
                            placeholder: 'Email',
                            size: 'large',
                            prefix: <AntdIcon type="mail" />
                        }}
                    />
                    <div style={{ textAlign: 'right' }}>
                        <AntdButton loading={submitting} htmlType="submit">Đăng ký</AntdButton>
                    </div>
                </Form>
            </AccountVerifyFormControlWrapper>
        );
    }
}

export const AccountVerifyForm = reduxForm<AccountVerifyFormValue>({
    form: 'AccountVerifyForm'
})(AccountVerifyFormComponent);
