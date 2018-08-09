import * as React from 'react';

import {
    Order
} from '@/restful';

import { Form, InjectedFormProps, reduxForm, Field } from 'redux-form';
import {
    FormError,
    AntdButton,
    AntdRow,
    AntdCol,
    renderInput,
    renderTextArea
} from '@/components';
import { } from '@/restful/resources/order';
import styled from 'styled-components';

const FormBody = styled.div`

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
                    <AntdRow>
                        <AntdCol span={12}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.phone)}
                                    component={renderInput}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={12}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.email)}
                                    component={renderInput}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={24}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.shippingAddress)}
                                    component={renderTextArea}
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
