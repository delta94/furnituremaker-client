import * as React from 'react';

import { AntdCard, AntdTable } from '@/components';

export class OrderTransactions extends React.PureComponent {
    render() {
        return (
            <AntdCard
                title="Giao dịch"
            >
                <AntdTable
                    bordered={true}
                >
                    <AntdTable.Column
                        title="Loại"
                    />
                    <AntdTable.Column
                        title="Thời gian"
                    />
                    <AntdTable.Column
                        title="Số tiền"
                    />
                    <AntdTable.Column
                        title="Ghi chú"
                    />
                </AntdTable>
            </AntdCard>
        );
    }
}