import * as React from 'react';
import {
    clearFields,
    Field,
    Form,
    InjectedFormProps,
    reduxForm
} from 'redux-form';
import styled from 'styled-components';

import { AccessControl } from '@/app';
import {
    AntdButton,
    AntdForm,
    renderInput,
    renderSelectField
} from '@/components';
import { orderUtils } from '@/restful';

import { AgencyField } from './order-filter-form';

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
    readonly code: string;
    readonly agencyOrderer: string;
    readonly status: string;
}

class OrderFilterFormComponent extends React.PureComponent<
    OrderFilterFormProps &
    InjectedFormProps<OrderFilterFormValues, OrderFilterFormProps>> {
    readonly agencyChange = (e, value) => {
        const { change } = this.props;
        if (!value) {
            change(nameof<OrderFilterFormValues>(o => o.agencyOrderer), null);
            e.preventDefault();
        }
    }

    render() {
        const { handleSubmit, change } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormFields>
                    <FormField>
                        <Field
                            name={nameof<OrderFilterFormValues>(o => o.code)}
                            component={renderInput}
                            inputProps={{
                                placeholder: 'Nhập mã order'
                            }}
                        />
                    </FormField>
                    <AccessControl allowRoles="root">
                        <FormField>
                            <AgencyField onChange={this.agencyChange} />
                        </FormField>
                    </AccessControl>
                    <FormField>
                        <Field
                            name={nameof<OrderFilterFormValues>(o => o.status)}
                            items={orderUtils.getStatusSelectItems()}
                            component={renderSelectField}
                            onChange={(e, value) => {
                                if (!value) {
                                    change(nameof<OrderFilterFormValues>(o => o.status), null);
                                    e.preventDefault();
                                }
                            }}
                            selectProps={{
                                placeholder: 'Tình trạng',
                                dropdownMatchSelectWidth: false,
                                allowClear: true
                            }}
                        />
                    </FormField>
                    <FormField>
                        <AntdForm.Item>
                            <AntdButton
                                icon="search"
                                type="primary"
                                htmlType="submit"
                                ghost={true}
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