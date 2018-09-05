import * as moment from 'moment';
import * as React from 'react';
import { submit } from 'redux-form';

import { CommonStoreProps } from '@/configs';
import {
    Order,
    orderResources,
    OrderUpdateMeta,
    orderUtils,
    restfulFetcher
} from '@/restful';

import {
    UpdateOrderForm,
    UpdateOrderFormValues
} from './update-order-from-control';

type Dispatch = Pick<CommonStoreProps, 'dispatch'>;
interface UpdateOrderFormControlProps extends
    Required<Dispatch> {
    readonly order: Order;
}

export class UpdateOrderFormControl extends React.Component<UpdateOrderFormControlProps> {
    readonly submit = async () => {
        const { dispatch } = this.props;
        const submitFormAction = submit('UpdateOrder');
        dispatch(submitFormAction);
    }

    readonly onFormSubmit = async (formValues: UpdateOrderFormValues) => {
        const { order } = this.props;

        const updatingOrder: Order = {
            ...order,
            status: formValues.status,
            shippingDate: formValues.shippingDate.toISOString()
        };

        const fetchMeta: OrderUpdateMeta = {
            sendNotificationTo: orderUtils.getCreatedById(order),
            notificationType: 'update-order'
        };

        await restfulFetcher.fetchResource(
            orderResources.update,
            [{
                type: 'path',
                parameter: 'id',
                value: order.id
            }, {
                type: 'body',
                value: updatingOrder
            }],
            fetchMeta
        );
    }

    render() {
        const { order } = this.props;
        return (
            <UpdateOrderForm
                onSubmit={this.onFormSubmit}
                initialValues={{
                    shippingDate: moment(order.shippingDate),
                    status: order.status
                }}
            />
        );
    }
}