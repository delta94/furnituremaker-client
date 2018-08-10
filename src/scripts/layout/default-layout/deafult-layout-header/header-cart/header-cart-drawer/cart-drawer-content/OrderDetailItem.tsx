import './OrderDetailItem.scss';

import * as React from 'react';

import {
    withDiscountByQuantities,
    WithDiscountByQuantitiesOwnProps,
    OrderDetail,
    restfulStore,
    WithDiscountByQuantities,
    discountByQuantitiesUtils,
    orderDetailUtils,
    resfulFetcher,
    orderDetailResources
} from '@/restful';

import { AntdList, AntdInputNumber, AntdButton } from '@/components';
import { formatCurrency } from '@/utilities';
import { AntdModal } from '@/components/antd-component/Modal';

interface OrderDetailItemProps extends
    WithDiscountByQuantitiesOwnProps,
    WithDiscountByQuantities {
    readonly orderDetail: OrderDetail;
}

type OrderDetailItemState = Partial<OrderDetail>;

@withDiscountByQuantities(restfulStore)
export class OrderDetailItem extends React.Component<OrderDetailItemProps, OrderDetailItemState> {
    // tslint:disable-next-line:readonly-keyword
    changeQuantityTimeOut = null;

    readonly updateOrderDetailQuantity = (nextQuantity: number) => {
        const { orderDetail, discountByQuantities } = this.props;
        const nextDiscoutPerProduct = discountByQuantitiesUtils.getDiscountValue(
            discountByQuantities,
            nextQuantity
        );
        const updateOrderDetail = orderDetailUtils.updateTheOrderDetail(
            orderDetail,
            nextQuantity,
            nextDiscoutPerProduct
        );
        const updateParams = orderDetailUtils.createUpdateParams(updateOrderDetail);
        return resfulFetcher.fetchResource(
            orderDetailResources.update,
            updateParams
        );
    }

    constructor(props: OrderDetailItemProps) {
        super(props);
        this.state = props.orderDetail;
    }

    render() {
        const { orderDetail } = this.props;
        return (
            <AntdList.Item
                className="order-detail-item"
                key={orderDetail.id}
                actions={[
                    <AntdInputNumber
                        value={this.state.quantity}
                        onChange={(nextValue: number) => {
                            this.setState(
                                { quantity: nextValue },
                                () => {
                                    if (this.changeQuantityTimeOut) {
                                        clearTimeout(this.changeQuantityTimeOut);
                                        this.changeQuantityTimeOut = null;
                                    }
                                    this.changeQuantityTimeOut = setTimeout(
                                        () => this.updateOrderDetailQuantity(nextValue),
                                        1000
                                    );
                                }
                            );
                        }}
                        placeholder="Số lượng"
                        key="quantity"
                        min={1}
                        style={{ width: 75 }}
                    />,
                    <AntdButton
                        key="remove"
                        icon="delete"
                        type="danger"
                        ghost={true}
                        onClick={() => {
                            AntdModal.confirm({
                                title: 'Xóa sản phẩm?',
                                content: 'Loại bỏ sản phẩm này khỏi giỏ hàng của bạn',
                                onOk: () => resfulFetcher.fetchResource(
                                    orderDetailResources.delete,
                                    [{ type: 'path', parameter: 'id', value: orderDetail.id }]
                                )
                            });
                        }}
                    >
                        xóa
                    </AntdButton>
                ]}
                extra={
                    <img
                        width={120}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                }
            >
                <AntdList.Item.Meta
                    title={<a href="https://ant.design">{orderDetail.productType.name}</a>}
                    description={(
                        <div>
                            <span>{orderDetail.productCode}</span>
                        </div>
                    )}
                />
                <div>Số lượng mua: {orderDetail.quantity}</div>
                <div>Đơn giá: {formatCurrency(orderDetail.productPrice)}</div>
                <div>Giảm giá mỗi sản phẩm: {formatCurrency(orderDetail.productDiscount)}</div>
                <div>thành tiền: {formatCurrency(orderDetail.subTotalPrice)}</div>
            </AntdList.Item >
        );
    }
}