import * as React from 'react';
import { submit } from 'redux-form';

import { withStoreValues } from '@/app';
import { fetchErrorHandler } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    City,
    Order,
    OrderDetail,
    orderDetailUtils,
    orderResources,
    orderUtils,
    promotionUtils,
    restfulFetcher,
    restfulStore,
    withCurrentUser,
    WithCurrentUserProps
} from '@/restful';

import {
    CreateOrderForm,
    createOrderForm,
    CreateOrderFormValues
} from './create-order-control';

export interface CreateOrderControlProps extends
    WithCurrentUserProps,
    Pick<CommonStoreProps, 'selectedPromotion'>,
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'dispatch'> {
    readonly orderDetails: OrderDetail[];
    readonly onOrderCreate: (order: Order) => void;
}

@withCurrentUser(restfulStore)
@withStoreValues<CreateOrderControlProps>('selectedPromotion')
export class CreateOrderControl extends React.Component<CreateOrderControlProps> {
    readonly onCreateOrder = async (formValues: CreateOrderFormValues) => {
        try {
            const { orderDetails, selectedPromotion, user } = this.props;
            const { order } = formValues;

            const productsTotalPayment = orderDetailUtils.getTotalOfPayment(orderDetails);
            const transportFee = orderUtils.getTransportFee({
                orderDetails,
                shippingToCity: order.shippingToCity
            });
            const orderTotalPrice = productsTotalPayment + transportFee;

            // * Discount
            const productsDiscount = orderDetailUtils.getTotalDiscount(orderDetails);
            const promotionDiscount = promotionUtils.getDiscount(selectedPromotion);
            const orderTotalDiscount = promotionDiscount + productsDiscount;
            // * End Discount

            const orderTotalOfPayment = orderTotalPrice - orderTotalDiscount;

            const newOrder: Partial<Order> = {
                ...order,
                totalPrice: orderTotalPrice,
                orderDetails: orderDetails,
                promotion: selectedPromotion,
                shippingFee: transportFee,
                totalOfPayment: orderTotalOfPayment,
                totalDiscount: orderTotalDiscount,
                productsDiscount: productsDiscount,
                promotionDiscount: promotionDiscount,
                depositRequired: orderUtils.getDeposit(orderTotalOfPayment),
                code: orderUtils.genCode(),
                agencyOrderer: user.agency,
                createdBy: user
            };

            const createdOrder = await restfulFetcher.fetchResource(
                orderResources.add,
                [{
                    type: 'body',
                    value: newOrder
                }]
            );

            return createdOrder;
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }

    componentWillMount() {
        const { setStore, dispatch } = this.props;
        const submitFormAction = submit(createOrderForm);
        setStore<CommonStoreProps>({
            submitOrderForm: () => dispatch(submitFormAction)
        });
    }

    render() {
        const { user, onOrderCreate, setStore } = this.props;
        const shippingDate = orderUtils.getShippingDate();
        return (
            <CreateOrderForm
                onSubmit={this.onCreateOrder}
                onFormStatusChange={(status) => {
                    setStore<CommonStoreProps>({ orderFormStatus: status });
                }}
                onCityChange={(city: City) => {
                    setStore<CommonStoreProps>({ orderFormSelectedCity: city });
                }}
                initialValues={{
                    order: {
                        email: user.agency && user.agency.email,
                        phone: user.agency && user.agency.phone,
                        shippingAddress: user.agency && user.agency.address,
                        shippingDate: shippingDate.toISOString(),
                        depositRequired: 0,
                        status: 'new'
                    }
                }}
                onSubmitSuccess={onOrderCreate}
            />
        );
    }
}