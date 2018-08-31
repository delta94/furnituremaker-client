import './OrderDetailItem.scss';

import * as React from 'react';
import { Link } from 'react-router-dom';

import {
    AntdButton,
    AntdIcon,
    AntdInputNumber,
    AntdList,
    AntdSpin
} from '@/components';
import { AntdModal } from '@/components/antd-component/Modal';
import { colorPrimary } from '@/configs';
import {
    discountByQuantitiesUtils,
    OrderDetail,
    orderDetailResources,
    orderDetailUtils,
    restfulFetcher,
    restfulStore,
    withDiscountByQuantities,
    WithDiscountByQuantities,
    WithDiscountByQuantitiesOwnProps
} from '@/restful';
import { formatCurrency } from '@/utilities';

interface OrderDetailItemProps extends
    WithDiscountByQuantitiesOwnProps,
    WithDiscountByQuantities {
    readonly orderDetail: OrderDetail;
}

type OrderDetailItemState = Partial<OrderDetail> & {
    readonly fetching?: boolean;
};

@withDiscountByQuantities(restfulStore)
export class OrderDetailItem extends React.Component<OrderDetailItemProps, OrderDetailItemState> {
    // tslint:disable-next-line:readonly-keyword
    changeQuantityTimeOut = null;

    readonly updateOrderDetailQuantity = async (nextQuantity: number) => {
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
        return await restfulFetcher.fetchResource(
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
        const { fetching } = this.state;

        return (
            <AntdList.Item
                className="order-detail-item"
                key={orderDetail.id}
                actions={[
                    <AntdInputNumber
                        value={this.state.quantity}
                        onChange={(nextValue: number) => {
                            this.setState(
                                {
                                    quantity: nextValue,
                                    fetching: true
                                },
                                () => {
                                    if (this.changeQuantityTimeOut) {
                                        clearTimeout(this.changeQuantityTimeOut);
                                        this.changeQuantityTimeOut = null;
                                    }
                                    this.changeQuantityTimeOut = setTimeout(
                                        async () => {
                                            this.updateOrderDetailQuantity(nextValue);
                                            this.setState({
                                                fetching: false
                                            });
                                        },
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
                    fetching ?
                        <AntdSpin indicator={<AntdIcon type="loading" spin={true} />} /> :
                        <AntdButton
                            key="remove"
                            icon="delete"
                            type="danger"
                            ghost={true}
                            onClick={() => {
                                AntdModal.confirm({
                                    title: 'Xóa sản phẩm?',
                                    content: 'Loại bỏ sản phẩm này khỏi giỏ hàng của bạn',
                                    onOk: () => restfulFetcher.fetchResource(
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
                        src={orderDetail.previewImg}
                    />
                }
            >
                <AntdList.Item.Meta
                    title={orderDetail.productType.name}
                    description={(
                        <div>
                            <Link to={`/maker/${orderDetail.productCode}`}>
                                Xem sản phẩm
                            </Link>
                        </div>
                    )}
                />
                <div>Số lượng mua: {orderDetail.quantity}</div>
                <div>Đơn giá: {formatCurrency(orderDetail.productPrice)}</div>
                <div>Giảm giá mỗi sản phẩm: {formatCurrency(orderDetail.productDiscount)}</div>
                <br/>
                <div>Tổng giảm giá: {formatCurrency(orderDetail.discount)}</div>
                <div>
                    Thành tiền: <b style={{ color: colorPrimary }}>
                        {formatCurrency(orderDetail.totalPrice)}
                    </b>
                </div>
            </AntdList.Item >
        );
    }
}