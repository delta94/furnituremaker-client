import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdColumnProps, AntdTable, AntdTag } from '@/components';
import {
    Order,
    orderTransactionUtils,
    orderUtils,
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
        title: 'Ngày Đặt',
        dataIndex: nameof<Order>(o => o.createdAt),
        key: nameof<Order>(o => o.createdAt),
        render: (createdAt: string) => {
            return formatDate(createdAt, 'DD/MM/YYYY');
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
        title: 'Đại lý',
        dataIndex: nameof<Order>(o => o.agencyOrderer),
        render: (agencyOrderer: Order['agencyOrderer']) => {
            return agencyOrderer.name;
        }
    }, {
        title: 'Tổng tiền',
        dataIndex: nameof<Order>(o => o.totalOfPayment),
        key: 'totalOfPayment',
        render: (totalOfPayment: Order['totalOfPayment']) => {
            return formatCurrency(totalOfPayment);
        }
    }, {
        title: <div style={{ textAlign: 'right' }}>Tình trạng</div>,
        dataIndex: nameof<Order>(o => o.status),
        key: 'status',
        render: (status: Order['status'], order: Order) => {
            const statusInfo = orderUtils.getStatusInfo(order);
            return <div style={{ textAlign: 'right' }}>{statusInfo.label}</div>;
        }
    }
];

@withOrders()
export class OrderListContent extends React.PureComponent<OrderListContentProps> {
    render() {
        const { orders } = this.props;
        return (
            <AntdTable
                rowKey="id"
                dataSource={orders}
                columns={columns}
            />
        );
    }
}