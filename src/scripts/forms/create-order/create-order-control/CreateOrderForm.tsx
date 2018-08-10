import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdCol,
    AntdRow,
    FormError,
    renderInput,
    renderTextArea,
    required
} from '@/components';
import { Order } from '@/restful';

const FormBody = styled.div`
    display: block;
`;

const FormWrapper = styled.div`
    margin: 0 0 0 0;
`;

interface CreateOrderFormProps {

}

export interface CreateOrderFormValues {
    readonly order: Partial<Order>;
}

class CreateOrderFormComponent extends React.Component<
    CreateOrderFormProps &
    InjectedFormProps<CreateOrderFormValues, CreateOrderFormProps>> {
    static readonly phoneValidates = [required('Nhập số điện thoại')];
    static readonly emailValidates = [required('Nhập cung cấp email')];
    static readonly addressValidates = [required('Nhập địa chỉ giao hàng')];

    render() {
        const { handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <AntdRow gutter={15}>
                        <AntdCol span={12}>
                            <FormWrapper>

                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.phone)}
                                    component={renderInput}
                                    validate={CreateOrderFormComponent.phoneValidates}
                                    label="Điện thoại"
                                    inputProps={{
                                        placeholder: 'Điện thoại'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={12}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.email)}
                                    component={renderInput}
                                    validate={CreateOrderFormComponent.emailValidates}
                                    label="Email"
                                    inputProps={{
                                        placeholder: 'Email'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={24}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.shippingAddress)}
                                    component={renderTextArea}
                                    validate={CreateOrderFormComponent.addressValidates}
                                    inputProps={{
                                        placeholder: 'Địa chỉ giao hàng'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                    </AntdRow>
                </FormBody>
                <AntdButton
                    type="primary"
                    htmlType="submit"
                >
                    Đặt hàng
                </AntdButton>
            </Form>
        );
    }
}

export const CreateOrderForm = reduxForm<CreateOrderFormValues, CreateOrderFormProps>({
    form: 'CreateOrderForm'
})(CreateOrderFormComponent);
