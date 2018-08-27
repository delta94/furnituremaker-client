import * as moment from 'moment';
import * as React from 'react';
import { CommonFieldProps, submit } from 'redux-form';

import { CommonStoreProps } from '@/configs';
import { Order, orderResources, restfulFetcher } from '@/restful';

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
            shippingDate: formValues.shippingDate.toISOString(),
            shippingAddress: formValues.shippingAddress
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
            }]
        );
    }

    render() {
        const { order } = this.props;
        return (
            <UpdateOrderForm
                onSubmit={this.onFormSubmit}
                initialValues={{
                    shippingDate: moment(order.shippingDate),
                    status: order.status,
                    shippingAddress: order.shippingAddress
                }}
            />
        );
    }
}