import * as React from 'react';
import { submit } from 'redux-form';

import { withStoreValues } from '@/app';
import { fetchErrorHandler } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    Order,
    OrderDetail,
    orderDetailUtils,
    orderResources,
    orderUtils,
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
    CommonStoreProps {
    readonly orderDetails: OrderDetail[];
    readonly onOrderCreate: () => void;
}

@withCurrentUser(restfulStore)
@withStoreValues(
    nameof<CreateOrderControlProps>(o => o.selectedPromotion)
)
export class CreateOrderControl extends React.Component<CreateOrderControlProps> {
    readonly onCreateOrder = async (formValues: CreateOrderFormValues) => {
        try {
            const { orderDetails, selectedPromotion } = this.props;
            const { order } = formValues;

            const totalPrice = orderDetailUtils.getTotalOfPayment(orderDetails);
            const newOrder: Partial<Order> = {
                ...order,
                totalPrice: orderDetailUtils.getTotalOfPayment(orderDetails),
                depositRequired: totalPrice * 0.3,
                orderDetails: orderDetails,
                promotion: selectedPromotion
            };

            await restfulFetcher.fetchResource(
                orderResources.add,
                [{
                    type: 'body',
                    value: newOrder
                }]
            );
        } catch (error) {
            throw await fetchErrorHandler(error);
        }
    }

    componentWillMount() {
        const { setStore, dispatch } = this.props;
        const submitFormAction = submit(createOrderForm);
        setStore({
            [nameof<CommonStoreProps>(o => o.submitOrderForm)]: () => dispatch(submitFormAction)
        });
    }

    render() {
        const { user, onOrderCreate, setStore } = this.props;

        const shippingDate = orderUtils.getShippingDate();

        return (
            <CreateOrderForm
                onSubmit={this.onCreateOrder}
                onFormStatusChange={(status) => {
                    setStore({ [nameof<CommonStoreProps>(o => o.orderFormStatus)]: status });
                }}
                initialValues={{
                    order: {
                        email: user.email,
                        phone: user.phone,
                        shippingAddress: user.address,
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