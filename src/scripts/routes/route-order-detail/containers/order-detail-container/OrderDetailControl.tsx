import * as React from 'react';
import { restfulDataContainer } from 'react-restful';

import { withStoreValues } from '@/app';
import { AntdModal, Container } from '@/components';
import { CommonStoreProps, InitAppStoreProps } from '@/configs';
import {
    UpdateOrderFormControl
} from '@/forms/update-order/UpdateOrderFormControl';
import {
    Order,
    orderResources,
    orderResourceType,
    OrderUpdateMeta,
    orderUtils,
    restfulFetcher,
    restfulStore
} from '@/restful';

import {
    OrderDetail,
    OrderDetailProps,
    OrderTransactions
} from './order-detail-control';

export interface OrderDetailControlProps extends
    Pick<OrderDetailProps, 'order'>,
    Pick<InitAppStoreProps, 'history'>,
    Pick<CommonStoreProps, 'dispatch'> {
}

export interface OrderDetailControlComponentState {
    readonly updateOrderModalVisibled: boolean;
}

@withStoreValues<InitAppStoreProps>('history')
class OrderDetailControlComponent extends React.Component<
    OrderDetailControlProps,
    OrderDetailControlComponentState> {

    // tslint:disable-next-line:readonly-keyword
    updateFormRef: UpdateOrderFormControl;

    readonly state = {
        updateOrderModalVisibled: false
    };

    readonly onOrderCancel = async (order: Order) => {
        const updatingOrder: Order = {
            ...order,
            status: 'cancel'
        };

        const meta: OrderUpdateMeta = {
            sendNotificationTo: 'root',
            notificationType: 'cancel-order'
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
            meta
        );
    }

    readonly onOrderChange = async (order: Order) => {
        const updatingOrder: Order = {
            ...order,
            status: 'change'
        };

        const meta: OrderUpdateMeta = {
            sendNotificationTo: 'root',
            notificationType: 'change-order'
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
            meta
        );
    }

    componentDidUpdate() {
        const { order, history } = this.props;
        if (!order) {
            history.replace('/orders');
        }
    }

    render() {
        const { order, dispatch } = this.props;
        const { updateOrderModalVisibled } = this.state;
        const adminCanUpdate = orderUtils.adminCanUpdate(order);
        return (
            <React.Fragment>
                <Container>
                    <OrderDetail
                        order={order}
                        onUpdateOrderClick={
                            adminCanUpdate && (() => {
                                this.setState({
                                    updateOrderModalVisibled: true
                                });
                            })
                        }
                        onOrderCancel={() => {
                            AntdModal.confirm({
                                title: 'Xác nhận',
                                content: 'Có phải bạn muốn xóa đơn hàng này',
                                okType: 'danger',
                                onOk: () => this.onOrderCancel(order)
                            });
                        }}
                        onOrderChange={() => {
                            AntdModal.confirm({
                                title: 'Xác nhận',
                                content: 'Có phải bạn muốn đổi trả đơn hàng này',
                                okType: 'danger',
                                onOk: () => this.onOrderChange(order)
                            });
                        }}
                    />
                    <OrderTransactions order={order} />
                </Container>
                <AntdModal
                    destroyOnClose={true}
                    visible={updateOrderModalVisibled}
                    title="Cập nhật đơn hàng"
                    onOk={async (e) => {
                        try {
                            await this.updateFormRef.submit();
                            this.setState({
                                updateOrderModalVisibled: false
                            });
                        } catch (error) {
                            // tslint:disable-next-line:no-console
                            console.error(error);
                        }
                    }}
                    onCancel={(e) => {
                        this.setState({
                            updateOrderModalVisibled: false
                        });
                    }}
                >
                    <UpdateOrderFormControl
                        ref={e => this.updateFormRef = e}
                        order={order}
                        dispatch={dispatch}
                    />
                </AntdModal>
            </React.Fragment>
        );
    }
}

export const OrderDetailControl = restfulDataContainer<Order, OrderDetailControlProps, OrderDetailControlProps>({
    store: restfulStore,
    resourceType: orderResourceType,
    getMappingDataFromProps: (ownProps) => {    
        return [ownProps.order];
    },
    mapToProps: (data) => {
        return {
            order: data[0]
        };
    }
})(OrderDetailControlComponent);