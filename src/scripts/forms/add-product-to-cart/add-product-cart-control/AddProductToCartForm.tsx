import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdCol,
    AntdDivider,
    AntdRow,
    AntdSelectOptionProps,
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

const orderBy = require('lodash/orderBy');

const FormBody = styled.div`
    margin: 0 0 15px 0;
`;

const FormActions = styled.div`
    text-align: right;
`;

const TotalValue = styled.div`
    font-size: 18px;
    color: ${colorPrimary};
    text-align: right;
`;

interface AddProductToCartFormOwnProps {
    readonly product: Product;
    readonly discountByQuantities: DiscountByQuantity[];
}

export interface AddToCartFormValues {
    readonly orderDetail?: OrderDetail;
    readonly quantityWithDiscount: number;
    readonly selectQuantity: number;
}

type AddProductToCartFormProps =
    AddProductToCartFormOwnProps &
    InjectedFormProps<AddToCartFormValues, AddProductToCartFormOwnProps>;

class AddProductToCartFormComponent extends React.Component<AddProductToCartFormProps> {
    readonly state: {
        readonly discountByQuantitySelectItems: AntdSelectOptionProps[];
    };

    readonly restToMinimumQuantity = () => {
        const { change } = this.props;
        change(nameof<AddToCartFormValues>(o => o.selectQuantity), 1);
    }

    readonly restToMaxiumQuantity = () => {
        const { change } = this.props;
        change(nameof<AddToCartFormValues>(o => o.selectQuantity), 50);
    }

    readonly changeDiscountSelectValue = (currentQuantity: number) => {
        const { change, discountByQuantities, product } = this.props;
        const { discountByQuantitySelectItems } = this.state;

        const hasSelectQuantity = discountByQuantitySelectItems.find(o => o.value === currentQuantity);
        if (!hasSelectQuantity) {
            const nearestDiscount =
                discountByQuantitiesUtils
                    .getNearestDiscountQuantityInList(discountByQuantities, currentQuantity);

            const newDiscount = {
                ...nearestDiscount,
                quantity: currentQuantity
            };

            const newSelectItems: AntdSelectOptionProps[] = [
                ...discountByQuantitySelectItems,
                {
                    value: currentQuantity,
                    title: discountByQuantitiesUtils.format(newDiscount, product)
                }
            ];

            const avaliabledDiscounts = discountByQuantities.map(o => o.quantity);

            const filteredItems = newSelectItems.filter(o => {
                if (o.value === currentQuantity) {
                    return true;
                }
                return avaliabledDiscounts.includes(+o.value);
            });

            const orderedByQuantityItems = orderBy(filteredItems, 'value');

            this.setState({
                discountByQuantitySelectItems: orderedByQuantityItems
            });
        }

        change(nameof<AddToCartFormValues>(o => o.quantityWithDiscount), currentQuantity);
    }

    constructor(props: AddProductToCartFormProps) {
        super(props);
        const { discountByQuantities, product } = props;
        this.state = {
            discountByQuantitySelectItems: discountByQuantities.map(o => ({
                value: o.quantity,
                title: discountByQuantitiesUtils.format(o, product)
            }))
        };
    }

    render() {
        const {
            discountByQuantities,
            product,
            handleSubmit,
            submitting,
            error,
            change
        } = this.props;

        const { discountByQuantitySelectItems } = this.state;

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
                                    label="Giá khuyến mãi"
                                    items={discountByQuantitySelectItems}
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
                                    min: 1,
                                    max: 50
                                }}
                                onChange={(event, value) => {
                                    this.changeDiscountSelectValue(value);
                                }}
                            />
                        </AntdCol>
                        <AntdCol span={24}>
                            <div>
                                <Field
                                    name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                                    component={(fieldProps) => {
                                        const { input } = fieldProps;
                                        const quantity = (typeof input.value === 'string') ? +input.value : input.value;

                                        if (!quantity) {
                                            this.restToMinimumQuantity();
                                            return null;
                                        } else if (quantity > 30) {
                                            this.restToMaxiumQuantity();
                                            return null;
                                        }

                                        const discountValue = discountByQuantitiesUtils
                                            .getDiscountValue(discountByQuantities, quantity);
                                        const totalDiscount = quantity * discountValue;
                                        const productPriceAfterDiscount = (product.totalPrice - discountValue);
                                        const totalPriceBeforeDiscont = quantity * product.totalPrice;
                                        const totalPrice = quantity * productPriceAfterDiscount;

                                        return (
                                            <AntdRow>
                                                <AntdCol span={12}>
                                                    Đơn giá ban đầu:
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {formatCurrency(product.totalPrice)}
                                                    </div>
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    Đơn giá hiện tại:
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    <TotalValue>
                                                        {formatCurrency(productPriceAfterDiscount)}
                                                    </TotalValue>
                                                </AntdCol>
                                                <AntdCol span={12} offset={12}>
                                                    <AntdDivider dashed={true} />
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    Tổng giá ban đầu:
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {formatCurrency(totalPriceBeforeDiscont)}
                                                    </div>
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    Tổng giảm giá:
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {totalDiscount ? `-${formatCurrency(totalDiscount)}` : 0}
                                                    </div>
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    Tổng thanh toán:
                                                </AntdCol>
                                                <AntdCol span={12}>
                                                    <TotalValue>
                                                        {formatCurrency(totalPrice)}
                                                    </TotalValue>
                                                </AntdCol>
                                            </AntdRow>
                                        );
                                    }}
                                />
                            </div>
                        </AntdCol>
                    </AntdRow>
                </FormBody>
                <FormActions>
                    <Field
                        name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                        component={(fieldProps) => {
                            return (
                                <AntdButton
                                    icon="shopping-cart"
                                    loading={submitting}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    {`Thêm ${fieldProps.input.value} sản phẩm vào giỏ`}
                                </AntdButton>
                            );
                        }}
                    />
                </FormActions>
            </Form>
        );
    }
}

export const AddProductToCartForm = reduxForm<AddToCartFormValues, AddProductToCartFormOwnProps>({
    form: 'AddToCartForm',
    enableReinitialize: true
})(AddProductToCartFormComponent);