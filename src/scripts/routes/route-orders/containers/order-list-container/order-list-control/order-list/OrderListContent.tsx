import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdColumnProps, AntdTable, AntdTag } from '@/components';
import {
    Order,
    orderDetailUtils,
    orderUtils,
    restfulStore,
    withOrders,
    WithOrdersProps
} from '@/restful';
import { formatCurrency, formatDate, toVNDay } from '@/utilities';

interface OrderListContentProps extends WithOrdersProps {

}

const columns: AntdColumnProps<Order>[] = [
    {
        title: 'Mã đơn hàng',
        dataIndex: nameof<Order>(o => o.id),
        render: (id: string, order) => {
            return (<Link to={`/orders/${id}`}>{order.code}</Link>);
        }
    }, {
        title: 'Ngày tạo',
        dataIndex: nameof<Order>(o => o.createdAt),
        key: nameof<Order>(o => o.createdAt),
        render: (createdAt: string) => {
            return formatDate(createdAt, 'DD/MM/YYYY');
        }
    }, {
        title: 'Số lượng',
        dataIndex: nameof<Order>(o => o.orderDetails),
        key: 'quantity',
        render: (orderDetails: Order['orderDetails']) => {
            return orderDetailUtils.getQuantity(orderDetails);
        }
    }, {
        title: 'Cần thanh toán',
        dataIndex: nameof<Order>(o => o.totalOfPayment),
        key: 'totalOfPayment',
        render: (totalOfPayment: Order['totalOfPayment']) => {
            return formatCurrency(totalOfPayment);
        }
    }, {
        title: 'Yêu cầu đặt cọc',
        dataIndex: nameof<Order>(o => o.depositRequired),
        key: 'deposit',
        render: (totalPrice: Order['depositRequired']) => {
            return formatCurrency(totalPrice);
        }
    }, {
        title: 'Đã thanh toán',
        dataIndex: nameof<Order>(o => o.theAmountPaid),
        key: nameof<Order>(o => o.theAmountPaid),
        render: (theAmountPaid: Order['theAmountPaid']) => {
            return formatCurrency(theAmountPaid);
        }
    }, {
        title: 'Dự kiến giao hàng',
        dataIndex: nameof<Order>(o => o.shippingDate),
        key: 'shippingDate',
        render: (shippingDate: Order['shippingDate']) => {
            return shippingDate ?
                `${toVNDay(shippingDate)} - ${formatDate(shippingDate, 'DD/MM/YYYY')}` :
                'Không xác định';
        }
    }, {
        title: 'Tình trạng',
        dataIndex: nameof<Order>(o => o.status),
        key: 'status',
        render: (status: Order['status'], order: Order) => {
            const statusInfo = orderUtils.getStatusInfo(order);
            return <AntdTag color={statusInfo.color}>{statusInfo.label}</AntdTag>;
        }
    }
];
class OrderListContentComponent extends React.PureComponent<OrderListContentProps> {
    render() {
        const { orders } = this.props;
        return (
            <AntdTable
                rowKey="id"
                dataSource={orders}
                columns={columns}
                bordered={true}
            />
        );
    }
}

export const OrderListContent = withOrders(restfulStore)(OrderListContentComponent);