import * as React from 'react';
import { Form, reduxForm, InjectedFormProps, Field, FormDecorator, ConfigProps } from 'redux-form';
import styled from 'styled-components';

import { AntdButton, renderSelectField, FormError, AntdMessage } from '@/components';
import {
    DiscountByQuantity,
    Product,
    discountByQuantitiesUtils,
    OrderDetail, withTempOrderDetails, restfulStore, WithTempOrderDetails
} from '@/restful';

const FormBody = styled.div`
    margin: 0 0 15px 0;
`;

const FormActions = styled.div`
    text-align: right;
`;

interface AddProductToCartFormProps {
    readonly product: Product;
    readonly discountByQuantities: DiscountByQuantity[];
}

export interface AddToCartFormValues {
    readonly orderDetail?: OrderDetail;
    readonly selectQuantity: number;
}

class AddProductToCartFormComponent extends React.Component<
    AddProductToCartFormProps &
    InjectedFormProps<AddToCartFormValues, AddProductToCartFormProps>> {
    render() {
        const {
            discountByQuantities,
            product,
            handleSubmit,
            submitting,
            error
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <Field
                        name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                        component={renderSelectField}
                        items={discountByQuantities.map(o => ({
                            value: o.quantity,
                            title: discountByQuantitiesUtils.format(o, product)
                        }))}
                        selectProps={{
                            className: 'w-100',
                            placeholder: 'chọn số lượng'
                        }}
                    />
                </FormBody>
                <FormActions>
                    <AntdButton
                        loading={submitting}
                        type="primary"
                        htmlType="submit"
                    >
                        Thêm vào giỏ
                    </AntdButton>
                </FormActions>
            </Form>
        );
    }
}

export const AddProductToCartForm = reduxForm<AddToCartFormValues, AddProductToCartFormProps>({
    form: 'AddToCartForm',
    onSubmitSuccess: () => AntdMessage.success('Sản phẩm đã được thêm vào giỏ'),
    enableReinitialize: true
})(AddProductToCartFormComponent);