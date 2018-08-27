import { Moment } from 'moment';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdCol,
    AntdRow,
    FormError,
    renderDatePickerField,
    renderSelectField,
    renderTextArea
} from '@/components';
import { Order, orderUtils } from '@/restful';

export interface UpdateOrderFormProps {

}

export interface UpdateOrderFormValues extends
    Pick<Order, 'status'>,
    Pick<Order, 'shippingAddress'> {
    readonly shippingDate: Moment;
}

class UpdateOrderFormComponent extends React.Component<
    UpdateOrderFormProps &
    InjectedFormProps<UpdateOrderFormValues, UpdateOrderFormProps>
    > {
    render() {
        const { handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <AntdRow gutter={15}>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<UpdateOrderFormValues>(o => o.shippingDate)}
                            component={renderDatePickerField}
                            label="Ngày giao hàng"
                            datePickerProps={{
                                allowClear: false,
                                style: { width: '100%' }
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<UpdateOrderFormValues>(o => o.status)}
                            items={orderUtils.getStatusSelectItems()}
                            component={renderSelectField}
                            label="Trạng thái đơn hàng"
                            selectProps={{
                                allowClear: false
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={24}>
                        <Field
                            name={nameof<UpdateOrderFormValues>(o => o.shippingAddress)}
                            component={renderTextArea}
                            label="Địa chỉ giao hàng"
                            required={true}
                        />
                    </AntdCol>
                </AntdRow>
            </Form>
        );
    }
}

export const UpdateOrderForm = reduxForm<UpdateOrderFormValues, UpdateOrderFormProps>({
    form: 'UpdateOrder'
})(UpdateOrderFormComponent);