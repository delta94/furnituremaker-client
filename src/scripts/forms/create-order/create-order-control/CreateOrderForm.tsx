import * as React from 'react';
import { Form, InjectedFormProps, reduxForm, Field } from 'redux-form';
import styled from 'styled-components';

import { Order } from '@/restful';

import {
    FormError,
    AntdButton,
    AntdRow,
    AntdCol,
    renderInput,
    renderTextArea
} from '@/components';

const FormBody = styled.div`
    display: block;
`;

const FormWrapper = styled.div`
    margin: 0 0 15px 0;
`;

interface CreateOrderFormProps {

}

export interface CreateOrderFormValues {
    readonly order: Partial<Order>;
}

class CreateOrderFormComponent extends React.Component<
    CreateOrderFormProps &
    InjectedFormProps<CreateOrderFormValues, CreateOrderFormProps>> {
    render() {
        const { handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <AntdRow gutter={15}>
                        <AntdCol span={12}>
                            <FormWrapper>
                                Điện thoại
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.phone)}
                                    component={renderInput}
                                    inputProps={{
                                        placeholder: 'Điện thoại'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={12}>
                            <FormWrapper>
                                Email
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.email)}
                                    component={renderInput}
                                    inputProps={{
                                        placeholder: 'Email'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={24}>
                            <FormWrapper>
                                Địa chỉ giao hàng
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.shippingAddress)}
                                    component={renderTextArea}
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
