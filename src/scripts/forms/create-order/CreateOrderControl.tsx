import * as React from 'react';
import {
    withCurrentUser,
    WithCurrentUserProps,
    restfulStore,
    OrderDetail,
    Order,
    resfulFetcher,
    orderResources
} from '@/restful';
import { fetchErrorHandler } from '@/components';

import { CreateOrderForm, CreateOrderFormValues } from './create-order-control';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

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

            const newOrder: Partial<Order> = {
                ...order,
                orderDetails: orderDetails
            };

            await resfulFetcher.fetchResource(
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
        return (
            <CreateOrderForm
                onSubmit={this.onCreateOrder}
                initialValues={{
                    order: {
                        email: user.email,
                        phone: user.phone,
                        shippingAddress: user.address
                    }
                }}
                onSubmitSuccess={onOrderCreate}
            />
        );
    }
}