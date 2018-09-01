import { Moment } from 'moment';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm, submit } from 'redux-form';

import {
    AntdCol,
    AntdRow,
    renderDatePickerField,
    renderInput,
    renderInputNumber,
    renderSelectField,
    renderTextArea,
    required
} from '@/components';
import { OrderTransaction, orderTransactionUtils, orderUtils } from '@/restful';

export interface CreateOrderTransactionFormOwnProps {

}

export interface CreateOrderTransactionFormValues
    extends OrderTransaction {
    readonly dateMoment: Moment;
}

type CreateOrderTransactionFormProps = CreateOrderTransactionFormOwnProps &
    InjectedFormProps<CreateOrderTransactionFormValues, CreateOrderTransactionFormOwnProps>;

class CreateOrderTransactionFormComponent extends React.PureComponent<CreateOrderTransactionFormProps> {
    static readonly typeRequired = required('Chọn loại giao dịch');
    static readonly moneyRequired = required('Nhập số tiền');

    public render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <AntdRow gutter={30}>
                    <AntdCol span={12}>
                        <Field
                            label="Loại giao dịch"
                            name={nameof<CreateOrderTransactionFormValues>(o => o.type)}
                            validate={CreateOrderTransactionFormComponent.typeRequired}
                            items={orderTransactionUtils.getTypeSelectItems()}
                            component={renderSelectField}
                            required={true}
                            selectProps={{
                                placeholder: 'Chọn loại'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            label="Ngày tháng"
                            name={nameof<CreateOrderTransactionFormValues>(o => o.dateMoment)}
                            component={renderDatePickerField}
                            required={true}
                            datePickerProps={{
                                allowClear: false,
                                className: 'w-100'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={24}>
                        <Field
                            label="Số tiền"
                            name={nameof<CreateOrderTransactionFormValues>(o => o.money)}
                            validate={CreateOrderTransactionFormComponent.moneyRequired}
                            component={renderInputNumber}
                            required={true}
                            inputProps={{
                                placeholder: 'Số tiền',
                                className: 'w-100'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={24}>
                        <Field
                            label="Ghi chú"
                            name={nameof<CreateOrderTransactionFormValues>(o => o.name)}
                            component={renderTextArea}
                            inputProps={{
                                rows: 2,
                                placeholder: 'Nhập ghi chú'
                            }}
                        />
                    </AntdCol>
                </AntdRow>
            </Form>
        );
    }
}

const formName = 'CreateOrderTransactionForm';

export const createOrderTransactionFormSubmit = submit(formName);

export const CreateOrderTransactionForm = reduxForm({
    form: formName
})(CreateOrderTransactionFormComponent);
