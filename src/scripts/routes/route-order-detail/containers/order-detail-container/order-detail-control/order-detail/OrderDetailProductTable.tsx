import * as React from 'react';

import { AntdCard, AntdColumnProps, AntdTable, Img } from '@/components';
import { Order, OrderDetail } from '@/restful';
import { formatCurrency } from '@/utilities';

export interface OrderDetailProductTableProps {
    readonly order: Order;
}

const columns: AntdColumnProps<OrderDetail>[] = [{
    title: 'Hình ảnh',
    dataIndex: nameof<OrderDetail>(o => o.productType),
    key: nameof<OrderDetail>(o => o.productType),
    render: (productType: OrderDetail['productType']) => {
        return <Img width="100" file={productType.thumbnail} />;
    }
}, {
    title: 'Tên',
    dataIndex: nameof<OrderDetail>(o => o.productType),
    key: nameof<OrderDetail>(o => o.productType),
    render: (productType: OrderDetail['productType']) => {
        return productType.name;
    }
}, {
    title: 'Mã sản phẩm',
    dataIndex: nameof<OrderDetail>(o => o.productCode),
    key: nameof<OrderDetail>(o => o.productCode)
}, {
    title: 'Số lượng',
    dataIndex: nameof<OrderDetail>(o => o.quantity),
    key: nameof<OrderDetail>(o => o.quantity)
}, {
    title: 'Đơn giá',
    dataIndex: nameof<OrderDetail>(o => o.productPrice),
    key: nameof<OrderDetail>(o => o.productPrice),
    render: (productPrice: number) => formatCurrency(productPrice)
}, {
    title: 'Giảm giá/sản phẩm',
    dataIndex: nameof<OrderDetail>(o => o.productDiscount),
    key: nameof<OrderDetail>(o => o.productDiscount),
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
                />
            </AntdCard>
        );
    }
}