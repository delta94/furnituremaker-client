import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Auth } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import {
    agencyResources,
    agencyUtils,
    restfulFetcher,
    restfulStore
} from '@/restful';
import { ShippingCost } from '@/routes/route-cart/containers/CartUI';
import { formatCurrency } from '@/utilities';

interface CardTotalOfPaymentProps {
    readonly orderPrice: number;
}

export class CartDiscountByAgencyLevel extends React.Component<CardTotalOfPaymentProps> {
    render() {
        const { orderPrice } = this.props;
        const user = Auth.instance.currentUser;
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={agencyResources.findOne}
                parameters={[{
                    type: 'path',
                    parameter: 'id',
                    value: user.agency.id
                }]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        const agency = renderProps.data;
                        const discountByAgencyLevel = agencyUtils
                            .getOrderDiscountByLevel(agency, orderPrice);

                        return (
                            <AntdRow>
                                <AntdCol span={12}>
                                    <div>
                                        Chính sách khuyến mãi {agency.level.name}:
                                    </div>
                                    <i>Giảm {agency.level.discountPercent}% giá trị đơn hàng</i>
                                </AntdCol>
                                <AntdCol span={12}>
                                    <ShippingCost>
                                        -{formatCurrency(discountByAgencyLevel)}
                                    </ShippingCost>
                                </AntdCol>
                            </AntdRow>
                        );
                    }
                    return <span>Đang tải chính sách dành cho đại ý...</span>;
                }}
            />
        );
    }
}