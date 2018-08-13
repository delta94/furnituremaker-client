import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdCol,
    AntdMessage,
    AntdRow,
    FormError,
    renderInputNumber,
    renderSelectField
} from '@/components';
import { colorPrimary } from '@/configs';
import {
    discountByQuantitiesUtils,
    DiscountByQuantity,
    OrderDetail,
    Product
} from '@/restful';
import { formatCurrency } from '@/utilities';

const FormBody = styled.div`
    margin: 0 0 15px 0;
`;

const FormActions = styled.div`
    text-align: left;
`;

const TotalValue = styled.span`
    font-size: 18px;
    color: ${colorPrimary};
`;

interface AddProductToCartFormProps {
    readonly product: Product;
    readonly discountByQuantities: DiscountByQuantity[];
}

export interface AddToCartFormValues {
    readonly orderDetail?: OrderDetail;
    readonly quantityWithDiscount: number;
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
            error,
            change
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <AntdRow gutter={10}>
                        {(discountByQuantities && discountByQuantities.length) &&
                            <AntdCol span={17}>
                                <Field
                                    name={nameof<AddToCartFormValues>(o => o.quantityWithDiscount)}
                                    component={renderSelectField}
                                    label="Khuyến mãi"
                                    items={discountByQuantities.map(o => ({
                                        value: o.quantity,
                                        title: discountByQuantitiesUtils.format(o, product)
                                    }))}
                                    selectProps={{
                                        className: 'w-100',
                                        placeholder: 'chọn số lượng'
                                    }}
                                    onChange={(prevenDefault, value) => {
                                        change(nameof<AddToCartFormValues>(o => o.selectQuantity), value);
                                    }}
                                />
                            </AntdCol>
                        }
                        <AntdCol span={7}>
                            <Field
                                name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                                component={renderInputNumber}
                                label="Số lượng"
                                inputProps={{
                                    className: 'w-100',
                                    min: 1
                                }}
                            />
                        </AntdCol>
                        <AntdCol span={24}>
                            <div >
                                <Field
                                    name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                                    component={(fieldProps) => {
                                        const { input } = fieldProps;
                                        const quantity = (typeof input.value === 'string') ? +input.value : input.value;
                                        const discountValue = discountByQuantitiesUtils
                                            .getDiscountValue(discountByQuantities, quantity);

                                        const totalPrice = quantity * (product.totalPrice - discountValue);
                                        return (
                                            <div>
                                                Tổng: <TotalValue>{formatCurrency(totalPrice)}</TotalValue>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </AntdCol>
                    </AntdRow>
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