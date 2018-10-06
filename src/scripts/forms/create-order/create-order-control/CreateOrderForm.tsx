import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdCol,
    AntdRow,
    AntdSelectOptionProps,
    FormError,
    renderInput,
    renderSelectField,
    renderTextArea,
    required
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { City, County, Order } from '@/restful';

import {
    OrderFormCityField,
    OrderFormCityFieldProps
} from './create-order-form';

const FormBody = styled.div`
    display: block;
`;

const FormWrapper = styled.div`
    margin: 0 0 0 0;
`;

export interface CreateOrderFormProps extends
    Pick<OrderFormCityFieldProps, 'onCityChange'> {
    readonly onFormStatusChange: (status: CommonStoreProps['orderFormStatus']) => void;
}

export interface CreateOrderFormValues {
    readonly order: Partial<Order>;
    readonly city_county?: string[];
}

class CreateOrderFormComponent extends React.Component<
    CreateOrderFormProps &
    InjectedFormProps<CreateOrderFormValues, CreateOrderFormProps>> {
    static readonly countyValidates = [required('Nhập quận huyện')];
    static readonly phoneValidates = [required('Nhập số điện thoại')];
    static readonly emailValidates = [required('Nhập cung cấp email')];
    static readonly addressValidates = [required('Nhập địa chỉ giao hàng')];

    readonly onCityChange = (city: City, county: County) => {
        const { change, onCityChange } = this.props;

        change(nameof.full<CreateOrderFormValues>(o => o.order.shippingToCity), city);
        change(nameof.full<CreateOrderFormValues>(o => o.order.shippingToCounty), county);
        
        onCityChange(city, county);
    }

    componentDidUpdate(prevProps: InjectedFormProps<CreateOrderFormValues, CreateOrderFormProps>) {
        const {
            onFormStatusChange,
            submitting,
            submitSucceeded,
            submitFailed
        } = this.props;

        if (submitting) {
            onFormStatusChange('submitting');
        } else if (submitSucceeded) {
            onFormStatusChange('submitSucceeded');
        } else if (submitFailed) {
            onFormStatusChange('submitFailed');
        } else {
            onFormStatusChange('default');
        }
    }

    render() {
        const { handleSubmit, initialValues, error } = this.props;
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
                                    required={true}
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
                                    required={true}
                                    label="Email"
                                    inputProps={{
                                        placeholder: 'Email'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={12}>
                            <FormWrapper>
                                <OrderFormCityField
                                    initCity={initialValues.order.shippingToCity}
                                    initCounty={initialValues.order.shippingToCounty}
                                    fieldName={nameof<CreateOrderFormValues>(o => o.city_county)}
                                    onCityChange={this.onCityChange}
                                />
                            </FormWrapper>
                        </AntdCol>
                        <AntdCol span={12}>
                            <FormWrapper>
                                <Field
                                    name={nameof.full<CreateOrderFormValues>(o => o.order.shippingAddress)}
                                    component={renderInput}
                                    validate={CreateOrderFormComponent.addressValidates}
                                    required={true}
                                    label="Địa chỉ giao hàng"
                                    inputProps={{
                                        placeholder: 'Nhập địa chỉ giao hàng'
                                    }}
                                />
                            </FormWrapper>
                        </AntdCol>
                    </AntdRow>
                </FormBody>
            </Form>
        );
    }
}

export const createOrderForm = 'CreateOrderForm';

export const CreateOrderForm = reduxForm<CreateOrderFormValues, CreateOrderFormProps>({
    form: createOrderForm,
    destroyOnUnmount: false
})(CreateOrderFormComponent);