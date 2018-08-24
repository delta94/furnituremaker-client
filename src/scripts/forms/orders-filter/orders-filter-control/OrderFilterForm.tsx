import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdCol,
    AntdForm,
    AntdRow,
    renderInput,
    renderSelectField
} from '@/components';

const FormFields = styled.div`
    display: flex;
`;

const FormField = styled.div`
    min-width: 150px;
    &:not(:last-child) {
        margin: 0 10px 0 0;
    }
`;

interface OrderFilterFormProps {

}

export interface OrderFilterFormValues {
    readonly orderCode: string;
    readonly agency: string;
    readonly city: string;
}

class OrderFilterFormComponent extends React.PureComponent<
    OrderFilterFormProps &
    InjectedFormProps<OrderFilterFormValues, OrderFilterFormProps>> {

    render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormFields>
                    <FormField>
                        <Field
                            name={nameof<OrderFilterFormValues>(o => o.orderCode)}
                            component={renderInput}
                            inputProps={{
                                placeholder: 'Nhập mã order'
                            }}
                        />
                    </FormField>
                    <FormField>
                        <Field
                            name={nameof<OrderFilterFormValues>(o => o.agency)}
                            items={[]}
                            component={renderSelectField}
                            selectProps={{
                                placeholder: 'Đại lý'
                            }}
                        />
                    </FormField>
                    <FormField>
                        <Field
                            name={nameof<OrderFilterFormValues>(o => o.city)}
                            items={[]}
                            component={renderSelectField}
                            selectProps={{
                                placeholder: 'Tỉnh thành'
                            }}
                        />
                    </FormField>
                    <FormField>
                        <AntdForm.Item>
                            <AntdButton
                                icon="search"
                            >
                                Tìm
                            </AntdButton>
                        </AntdForm.Item>
                    </FormField>
                </FormFields>
            </Form>
        );
    }
}

export const OrderFilterForm = reduxForm({
    form: 'OrderFilterForm'
})(OrderFilterFormComponent);