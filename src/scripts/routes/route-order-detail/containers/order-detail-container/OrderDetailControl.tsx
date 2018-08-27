import * as React from 'react';
import { restfulDataContainer } from 'react-restful';

import { withStoreValues } from '@/app';
import { AntdModal } from '@/components';
import { CommonStoreProps, InitAppStoreProps } from '@/configs';
import {
    UpdateOrderFormControl
} from '@/forms/update-order/UpdateOrderFormControl';
import {
    Order,
    orderResources,
    orderResourceType,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { OrderDetail, OrderDetailProps } from './order-detail-control';

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

    readonly onOrderChange = async (order: Order) => {
        const updatingOrder: Order = {
            ...order,
            status: 'change'
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

    componentDidUpdate() {
        const { order, history } = this.props;
        if (!order) {
            history.replace('/orders');
        }
    }

    render() {
        const { order, dispatch } = this.props;
        const { updateOrderModalVisibled } = this.state;
        return (
            <React.Fragment>
                <OrderDetail
                    order={order}
                    onUpdateOrderClick={() => {
                        this.setState({
                            updateOrderModalVisibled: true
                        });
                    }}
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

export const OrderDetailControl = restfulDataContainer<Order, OrderDetailControlProps>({
    store: restfulStore,
    resourceType: orderResourceType,
    mapToProps: (data) => {
        return {
            order: data[0]
        };
    }
})(OrderDetailControlComponent);