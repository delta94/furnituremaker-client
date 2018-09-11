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
    Product,
    productDiscountUtils,
    productResources,
    productUtils,
    restfulFetcher,
    withDiscountByQuantities,
    WithDiscountByQuantities,
    WithDiscountByQuantitiesOwnProps,
    withProductDiscounts,
    WithProductDiscounts
} from '@/restful';
import { fileHostEntry } from '@/restful';
import { formatCurrency } from '@/utilities';

interface OrderDetailItemProps extends
    WithProductDiscounts,
    WithDiscountByQuantitiesOwnProps,
    WithDiscountByQuantities {
    readonly orderDetail: OrderDetail;
}

type OrderDetailItemState =
    Partial<OrderDetail> & {
        readonly fetching?: boolean;
    };

@withProductDiscounts()
@withDiscountByQuantities()
export class OrderDetailItem extends React.Component<OrderDetailItemProps, OrderDetailItemState> {
    // tslint:disable-next-line:readonly-keyword
    changeQuantityTimeOut = null;

    static readonly getDerivedStateFromProps = (
        nextProps: OrderDetailItemProps,
        currentState: OrderDetailItemState): Partial<OrderDetailItemState> => {

        if (
            nextProps.orderDetail.updatedAt !== currentState.updatedAt
        ) {
            return nextProps.orderDetail;
        }

        return null;
    }

    readonly updateOrderDetailQuantity = async (nextQuantity: number) => {
        const {
            orderDetail,
            discountByQuantities,
            productDiscounts
        } = this.props;

        let product: Product = null;

        if (orderDetail.productCode) {
            const fetchProductsWithCode = await restfulFetcher.fetchResource(
                productResources.find,
                [{
                    parameter: nameof<Product>(o => o.produceCode),
                    type: 'query',
                    value: orderDetail.productCode
                }]
            );
            product = fetchProductsWithCode[0];
        }

        const nextDiscoutPerProduct = productUtils.getDiscount(
            product,
            nextQuantity,
            discountByQuantities,
            productDiscountUtils.getDiscountByProduct(productDiscounts, product)
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
                        src={
                            orderDetail.previewImg.startsWith('/uploads') ?
                                fileHostEntry(orderDetail.previewImg) :
                                orderDetail.previewImg
                        }
                    />
                }
            >
                <AntdList.Item.Meta
                    title={typeof orderDetail.productType !== 'string' && orderDetail.productType.name}
                    description={(
                        <div>
                            <Link to={`/maker/${orderDetail.productModulesCode}`}>
                                Xem sản phẩm
                            </Link>
                        </div>
                    )}
                />
                <div>Số lượng mua: {orderDetail.quantity}</div>
                <div>Đơn giá: {formatCurrency(orderDetail.productPrice)}</div>
                <div>Giảm giá mỗi sản phẩm: {formatCurrency(orderDetail.totalDiscountPerProduct)}</div>
                <br />
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