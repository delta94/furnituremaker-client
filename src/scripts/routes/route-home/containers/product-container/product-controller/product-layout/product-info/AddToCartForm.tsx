import * as React from 'react';
import { Form, reduxForm, InjectedFormProps, Field } from 'redux-form';
import styled from 'styled-components';

import { AntdButton, renderSelectField, AntdAlert, AntdMessage, fetchErrorHandler } from '@/components';
import { DiscountByQuantities, Product, discountByQuantitiesUtils, resfulFetcher } from '@/restful';
import { OrderDetail, orderDetailResources } from '@/restful/resources/orderDetail';
import { FormError } from '@/components/antd-component/FormError';

const FormBody = styled.div`
    margin: 0 0 15px 0;
`;

const FormActions = styled.div`
    text-align: right;
`;

interface AddToCartFormProps {
    readonly discountByQuantities: DiscountByQuantities[];
    readonly product: Product;
}

interface FormValues {
    readonly orderDetail: OrderDetail;
}

class AddToCartFormComponent extends React.Component<
    AddToCartFormProps &
    InjectedFormProps<FormValues, AddToCartFormProps>> {
    render() {
        const {
            handleSubmit,
            discountByQuantities,
            product,
            submitting,
            error
        } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <Field
                        name={nameof.full<FormValues>(o => o.orderDetail.quantity)}
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

export const AddToCartForm = reduxForm<FormValues, AddToCartFormProps>({
    form: 'AddToCartForm',
    onSubmit: async (values) => {
        try {
            const { orderDetail } = values;
            await resfulFetcher.fetchResource(orderDetailResources.create, [{
                type: 'body',
                value: orderDetail
            }]);
        } catch (response) {
            throw await fetchErrorHandler(response);
        }
    },
    onSubmitSuccess: () => AntdMessage.success('Sản phẩm đã được thêm vào giỏ')
})(AddToCartFormComponent);