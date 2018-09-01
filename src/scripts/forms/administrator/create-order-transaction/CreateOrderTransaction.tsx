import * as moment from 'moment';
import * as React from 'react';

import { withStoreValues } from '@/app';
import { AntdButton, AntdMessage, AntdModal } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    Order,
    OrderTransaction,
    orderTransactionResources,
    orderTransactionUtils,
    restfulFetcher
} from '@/restful';

import {
    CreateOrderTransactionForm,
    createOrderTransactionFormSubmit,
    CreateOrderTransactionFormValues
} from './create-order-transaction-form';

export interface CreateOrderTransactionProps extends
    Pick<CommonStoreProps, 'dispatch'> {
    readonly order: Order;
}

@withStoreValues<CreateOrderTransactionProps>('dispatch')
export class CreateOrderTransaction extends React.PureComponent<CreateOrderTransactionProps> {
    readonly state: {
        readonly modalVisibled: boolean;
    };

    readonly toggleModalVisible = () => {
        this.setState({
            modalVisibled: !this.state.modalVisibled
        });
    }

    readonly formSubmit = async (values: CreateOrderTransactionFormValues) => {
        const { order } = this.props;

        const newOrderTransactiton: OrderTransaction = {
            money: values.money,
            note: values.note,
            type: values.type,
            // tslint:disable-next-line:no-any
            order: order.id as any,
            name: null,
            date: values.dateMoment.toISOString(),
            code: orderTransactionUtils.genCode()
        };

        const orderName = orderTransactionUtils.genName(newOrderTransactiton);
        await restfulFetcher.fetchResource(
            orderTransactionResources.create,
            [{
                type: 'body',
                value: {
                    ...newOrderTransactiton,
                    name: orderName
                }
            }]
        );
    }

    constructor(props: CreateOrderTransactionProps) {
        super(props);
        this.state = {
            modalVisibled: false
        };
    }

    public render() {
        const { modalVisibled } = this.state;
        const { dispatch } = this.props;

        return (
            <React.Fragment>
                <AntdButton
                    onClick={this.toggleModalVisible}
                >
                    Tạo giao dịch
                </AntdButton>
                <AntdModal
                    title="Tạo giao dịch"
                    visible={modalVisibled}
                    onOk={() => {
                        dispatch(createOrderTransactionFormSubmit);
                    }}
                    onCancel={this.toggleModalVisible}
                    destroyOnClose={true}
                >
                    <CreateOrderTransactionForm
                        onSubmit={this.formSubmit}
                        initialValues={{
                            dateMoment: moment()
                        }}
                        onSubmitSuccess={() => {
                            this.toggleModalVisible();
                            AntdMessage.success('Giao dịch được tạo thành công!');
                        }}
                    />
                </AntdModal>
            </React.Fragment>
        );
    }
}