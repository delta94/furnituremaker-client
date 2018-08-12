import * as React from 'react';

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

import { CreateOrderForm, CreateOrderFormValues } from './create-order-control';

interface CreateOrderControlProps extends
    WithCurrentUserProps,
    CommonStoreProps {
    readonly orderDetails: OrderDetail[];
    readonly onOrderCreate: () => void;
}

@withCurrentUser(restfulStore)
@withStoreValues()
export class CreateOrderControl extends React.Component<CreateOrderControlProps> {
    readonly onCreateOrder = async (formValues: CreateOrderFormValues) => {
        try {
            const { orderDetails } = this.props;
            const { order } = formValues;

            const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
            const newOrder: Partial<Order> = {
                ...order,
                totalPrice: orderDetailUtils.getTotalPrice(orderDetails),
                depositRequired: totalPrice * 0.3,
                orderDetails: orderDetails
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

    render() {
        const { user, onOrderCreate } = this.props;

        const shippingDate = orderUtils.getShippingDate();

        return (
            <CreateOrderForm
                onSubmit={this.onCreateOrder}
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