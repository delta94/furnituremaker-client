import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdCard, AntdColumnProps, AntdTable, Img } from '@/components';
import { Order, OrderDetail, ProductType } from '@/restful';
import { getProductLink } from '@/routes/desktop/route-product';
import { formatCurrency } from '@/utilities';

export interface OrderDetailProductTableProps {
    readonly order: Order;
}

const columns: AntdColumnProps<OrderDetail>[] = [{
    title: 'Hình ảnh',
    dataIndex: nameof<OrderDetail>(o => o.previewImg),
    key: nameof.full<OrderDetail>(o => o.previewImg),
    width: 112,
    render: (previewImg: OrderDetail['previewImg']) => {
        return <Img width="100" file={previewImg} />;
    }
}, {
    title: 'Loại sản phẩm',
    dataIndex: nameof<OrderDetail>(o => o.product_type),
    key: nameof<OrderDetail>(o => o.product_type),
        render: (productType: ProductType, orderDetail) => {
        return (
            <div>
                <label>
                    <b> {productType.name}</b>
                </label>
                <br />
                {
                    orderDetail.productModulesCode &&
                    (<Link to={`/maker/${orderDetail.productModulesCode}`}>Xem Thiết kế</Link>)
                }
            </div>
        );
    }
}, {
    title: 'Mã sản phẩm',
    dataIndex: nameof<OrderDetail>(o => o.productCode),
    key: nameof<OrderDetail>(o => o.productCode),
    render: (produceCode: string) => {
        if (!produceCode) {
            return (<i>Đang cập nhật...</i>);
        }
        return (
            (<Link to={getProductLink({ produceCode })}>{produceCode}</Link>)
        );
    }
}, {
    title: 'Số lượng',
    dataIndex: nameof<OrderDetail>(o => o.quantity),
    key: nameof<OrderDetail>(o => o.quantity),
    render: (quantity: number) => `${quantity} sản phẩm`
}, {
    title: 'Đơn giá',
    dataIndex: nameof<OrderDetail>(o => o.productPrice),
    key: nameof<OrderDetail>(o => o.productPrice),
    render: (productPrice: number) => formatCurrency(productPrice)
}, {
    title: 'Giảm giá/sản phẩm',
    dataIndex: nameof<OrderDetail>(o => o.totalDiscountPerProduct),
    key: nameof<OrderDetail>(o => o.totalDiscountPerProduct),
    render: (productDiscount: number) => formatCurrency(productDiscount)
}, {
    title: 'Tổng tiền',
    dataIndex: nameof<OrderDetail>(o => o.totalPrice),
    key: nameof<OrderDetail>(o => o.totalPrice),
    render: (totalPrice: number) => formatCurrency(totalPrice)
}];

export class OrderDetailProductTable extends React.Component<OrderDetailProductTableProps> {
    render() {
        const { order } = this.props;
        return (
            <AntdCard
                title="Sản phẩm"
            >
                <AntdTable
                    rowKey="id"
                    columns={columns}
                    dataSource={order.orderDetails}
                    pagination={false}
                    bordered={true}
                />
            </AntdCard>
        );
    }
}