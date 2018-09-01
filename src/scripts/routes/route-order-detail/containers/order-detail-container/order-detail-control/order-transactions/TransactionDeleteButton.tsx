import * as React from 'react';

import { AntdButton, AntdMessage, AntdModal } from '@/components';
import {
    OrderTransaction,
    orderTransactionResources,
    restfulFetcher
} from '@/restful';

export interface TransactionDeleteButtonProps {
    readonly orderTransaction: OrderTransaction;
}

export class TransactionDeleteButton extends React.PureComponent<TransactionDeleteButtonProps> {
    readonly onOrderTransactionDelete = async () => {
        const { orderTransaction } = this.props;

        await restfulFetcher.fetchResource(
            orderTransactionResources.delete,
            [{
                type: 'path',
                parameter: 'id',
                value: orderTransaction.id
            }]
        );

        AntdMessage.success('Xóa thành công giao dịch');
    }

    public render() {
        return (
            <AntdButton
                onClick={() => {
                    AntdModal.confirm({
                        title: 'Xác nhận xóa?',
                        // tslint:disable-next-line:max-line-length
                        content: 'Ngày mai, mọi lỗi lầm đều được sửa chữa; nhưng cái ngày mai đó không bao giờ đến - Benjamin Franklin',
                        okText: 'Xóa luôn',
                        cancelText: 'Suy nghĩ lại',
                        onOk: this.onOrderTransactionDelete
                    });
                }}
                type="danger"
                icon="delete"
                shape="circle"
            />
        );
    }
}