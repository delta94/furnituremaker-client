import * as React from 'react';

import { AntdTable } from '@/components';
import { City } from '@/restful';
import { formatCurrency } from '@/utilities';

interface TTransportFeeByCityControlProps {
    readonly cities: City[];
}

export class TransportFeeByCityControl extends React.PureComponent<TTransportFeeByCityControlProps> {
    render() {
        const { cities } = this.props;
        return (
            <AntdTable
                dataSource={cities}
                bordered={true}
                pagination={false}
            >
                <AntdTable.Column
                    title="Tỉnh thành giao nhận"
                    dataIndex={nameof<City>(o => o.name)}
                />
                <AntdTable.Column
                    title="Giá trên mỗi đơn vị CBM"
                    dataIndex={nameof<City>(o => o.transportFee)}
                    render={(transportFee: number) => {
                        return formatCurrency(transportFee);
                    }}
                />
            </AntdTable>
        );
    }
}