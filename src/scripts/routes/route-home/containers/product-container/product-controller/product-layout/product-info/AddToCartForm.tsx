import * as React from 'react';
import { Form, reduxForm, InjectedFormProps, Field } from 'redux-form';
import { AntdButton, renderSelectField } from '@/components';
import styled from 'styled-components';
import { DiscountByQuantities, Product, productUtils, discountByQuantitiesUtils } from '@/restful';

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

class AddToCartFormComponent extends React.Component<AddToCartFormProps & InjectedFormProps<{}, AddToCartFormProps>> {
    render() {
        const {
            handleSubmit,
            discountByQuantities,
            product
        } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormBody>
                    <Field
                        name="quantity"
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
                    <AntdButton type="primary">Thêm vào giỏ</AntdButton>
                </FormActions>
            </Form>
        );
    }
}

export const AddToCartForm = reduxForm<{}, AddToCartFormProps>({
    form: 'AddToCartForm'
})(AddToCartFormComponent);