import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';

import {
    AntdButton,
    AntdCol,
    AntdRow,
    AntdSelectOptionProps,
    FormError,
    renderInputNumber,
    renderSelectField
} from '@/components';
import {
    discountByQuantitiesUtils,
    DiscountByQuantity,
    OrderDetail,
    ProductDiscount,
    productDiscountUtils,
    ProductExtended,
    productUtils
} from '@/restful';
import { formatCurrency } from '@/utilities';

const orderBy = require('lodash/orderBy');

const FormBody = styled.div`
    margin: 0 0 30px 0;
`;

const FormActions = styled.div`
    text-align: left;
`;

const PriceAfterDiscount = styled.div`
    line-height: normal;
    font-size: 20px;
    letter-spacing: -0.00510711px;

    color: #8ABB25;
`;

const TotalDiscount = styled.div`
    color: #8ABB25;
    text-align: right;
`;

interface AddProductToCartFormOwnProps {
    readonly product: ProductExtended;
    readonly discountByQuantities: DiscountByQuantity[];
    readonly productDiscount?: ProductDiscount;
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
    readonly getMaxProductCanBuy = () => this.props.product.inventory || 50;

    readonly restToMinimumQuantity = () => {
        const { change } = this.props;
        change(nameof<AddToCartFormValues>(o => o.selectQuantity), 1);
    }

    readonly restToMaxiumQuantity = () => {
        const { change } = this.props;
        change(
            nameof<AddToCartFormValues>(o => o.selectQuantity),
            this.getMaxProductCanBuy()
        );
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
        const { discountByQuantities, product, productDiscount } = props;

        const productDiscountValue =
            productDiscountUtils.getDiscountMoney(productDiscount, product);

        this.state = {
            discountByQuantitySelectItems: discountByQuantities.map(discountByQuantity => {
                return {
                    value: discountByQuantity.quantity,
                    title: discountByQuantitiesUtils.format(
                        discountByQuantity,
                        product,
                        (rawPrice) => rawPrice - productDiscountValue
                    )
                };
            })
        };
    }

    render() {
        const {
            discountByQuantities,
            product,
            productDiscount,
            handleSubmit,
            error,
            change
        } = this.props;

        const { discountByQuantitySelectItems } = this.state;

        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <FormBody>
                    <Field
                        name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                        component={(fieldProps) => {
                            const { input } = fieldProps;
                            const quantity = (typeof input.value === 'string') ? +input.value : input.value;

                            if (!quantity) {
                                return null;
                            }

                            const productDiscountValue =
                                productDiscountUtils.getDiscountMoney(productDiscount, product);

                            const discountByQuantityValue = discountByQuantitiesUtils
                                .getDiscountValue(discountByQuantities, quantity);

                            const discountValue = productDiscountValue + discountByQuantityValue;

                            const productPriceAfterDiscount =
                                (product.totalPrice - discountValue);

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
                                        <TotalDiscount>
                                            <PriceAfterDiscount>
                                                Chỉ còn {formatCurrency(productPriceAfterDiscount)}
                                            </PriceAfterDiscount>
                                        </TotalDiscount>
                                    </AntdCol>
                                </AntdRow>
                            );
                        }}
                    />
                    <AntdRow gutter={10}>
                        {(discountByQuantities && discountByQuantities.length) ?
                            (<AntdCol span={24}>
                                <Field
                                    name={nameof<AddToCartFormValues>(o => o.quantityWithDiscount)}
                                    component={renderSelectField}
                                    label="Chọn số lượng"
                                    items={discountByQuantitySelectItems}
                                    selectProps={{
                                        className: 'w-100',
                                        placeholder: 'chọn số lượng',
                                        size: 'large'
                                    }}
                                    onChange={(prevenDefault, value) => {
                                        change(nameof<AddToCartFormValues>(o => o.selectQuantity), value);
                                    }}
                                />
                            </AntdCol>)
                            :
                            (
                                <AntdCol span={24}>
                                    <Field
                                        name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                                        component={renderInputNumber}
                                        label="Nhập số lượng"
                                        inputProps={{
                                            className: 'w-100',
                                            min: 1,
                                            max: this.getMaxProductCanBuy(),
                                            size: 'large'
                                        }}
                                        onChange={(event, value) => {
                                            this.changeDiscountSelectValue(value);
                                        }}
                                    />
                                </AntdCol>
                            )
                        }
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
                                        } else if (quantity > this.getMaxProductCanBuy()) {
                                            this.restToMaxiumQuantity();
                                            return null;
                                        }

                                        const productDiscountValue =
                                            productDiscountUtils.getDiscountMoney(productDiscount, product);

                                        const discountByQuantityValue = discountByQuantitiesUtils
                                            .getDiscountValue(discountByQuantities, quantity);

                                        const discountValue = productDiscountValue + discountByQuantityValue;

                                        const totalDiscount = quantity * discountValue;
                                        const productPriceAfterDiscount =
                                            (product.totalPrice - discountValue);

                                        const totalPriceBeforeDiscont = quantity * product.totalPrice;
                                        const totalPrice = quantity * productPriceAfterDiscount;

                                        return (
                                            <React.Fragment>
                                                <AntdRow key={1}>
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
                                                            <TotalDiscount>
                                                                {totalDiscount ?
                                                                    `-${formatCurrency(totalDiscount)}` :
                                                                    0
                                                                }
                                                            </TotalDiscount>
                                                        </div>
                                                    </AntdCol>
                                                </AntdRow>
                                                <AntdRow>
                                                    <AntdCol span={12}>
                                                        Tổng thanh toán:
                                                    </AntdCol>
                                                    <AntdCol span={12}>
                                                        <div style={{ textAlign: 'right' }}>
                                                            {formatCurrency(totalPrice)}
                                                        </div>
                                                    </AntdCol>
                                                </AntdRow>
                                            </React.Fragment>
                                        );
                                    }}
                                />
                            </div>
                        </AntdCol>
                    </AntdRow>
                </FormBody>
                <FormActions>
                    <AntdRow>
                        <Field
                            name={nameof.full<AddToCartFormValues>(o => o.selectQuantity)}
                            component={this.renderSubmitButton}
                        />
                    </AntdRow>
                </FormActions>
            </Form>
        );
    }

    readonly renderSubmitButton = () => {
        const { submitting, product } = this.props;

        const code = productUtils.getProductModulesCode(product);
        const disabled = code.includes('999');

        if (disabled) {
            return <i>Vui lòng chọn vật liệu trước khi thêm vào giỏ</i>;
        }

        return (
            <AntdButton
                className="button-primary w-100"
                loading={submitting}
                type="primary"
                htmlType="submit"
            >
                Thêm vào giỏ
            </AntdButton>
        );
    }
}

export const AddProductToCartForm = reduxForm<AddToCartFormValues, AddProductToCartFormOwnProps>({
    form: 'AddToCartForm',
    enableReinitialize: true
})(AddProductToCartFormComponent);