import * as React from 'react';

import { AntdCard, AntdTable } from '@/components';
import {
    CreateOrderTransaction,
    CreateOrderTransactionProps
} from '@/forms/administrator/create-order-transaction';
import {
    OrderTransaction,
    orderTransactionUtils,
    restfulStore,
    WithOrderTransactionProps,
    withOrderTransactionsByOrder
} from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

interface OrderTransactionsProps extends
    WithOrderTransactionProps,
    Pick<CreateOrderTransactionProps, 'order'> {
}

@withOrderTransactionsByOrder(restfulStore)
export class OrderTransactions extends React.PureComponent<OrderTransactionsProps> {
    render() {
        const { order, orderTransactions } = this.props;
        return (
            <AntdCard
                title="Lịch sử giao dịch"
                extra={<CreateOrderTransaction order={order} />}
            >
                <AntdTable
                    dataSource={orderTransactions}
                    bordered={true}
                >
                    <AntdTable.Column
                        title="Mã giao dịch"
                        dataIndex={nameof<OrderTransaction>(o => o.code)}
                    />
                    <AntdTable.Column
                        title="Loại"
                        dataIndex={nameof<OrderTransaction>(o => o.type)}
                        render={(type: OrderTransaction['type']) => {
                            const title = orderTransactionUtils.getTypeTitle(type);
                            return title;
                        }}
                    />
                    <AntdTable.Column
                        title="Thời gian"
                        dataIndex={nameof<OrderTransaction>(o => o.date)}
                        render={(date: OrderTransaction['date']) => {
                            return formatDate(new Date(date), 'HH:mm DD/MM/YYYY');
                        }}
                    />
                    <AntdTable.Column
                        title="Số tiền"
                        dataIndex={nameof<OrderTransaction>(o => o.money)}
                        render={(money: OrderTransaction['money']) => {
                            return formatCurrency(money);
                        }}
                    />
                    <AntdTable.Column
                        title="Ghi chú"
                        dataIndex={nameof<OrderTransaction>(o => o.note)}
                        render={(note: OrderTransaction['note']) => {
                            if (!note) {
                                return <i>Không có ghi chú</i>;
                            }
                            return note;
                        }}
                    />
                </AntdTable>
            </AntdCard>
        );
    }
}