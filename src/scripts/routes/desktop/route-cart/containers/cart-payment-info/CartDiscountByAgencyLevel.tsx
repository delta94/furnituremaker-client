import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { agencyResources, agencyUtils, restfulFetcher } from '@/restful';
import { ShippingCost } from '@/routes/desktop/route-cart/containers/CartUI';
import { formatCurrency } from '@/utilities';

const DiscountValue = styled.span`
    font-weight: bold;
    color: #E99A23;
    line-height: 1;
    font-size: 36px;
    letter-spacing: -0.00357498px;
    display: inline-block;
    vertical-align: middle;
`;

interface CardTotalOfPaymentProps {
    readonly orderPrice: number;
}

export class CartDiscountByAgencyLevel extends React.Component<CardTotalOfPaymentProps> {
    render() {
        const user = Auth.instance.currentUser;
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={agencyResources.findOne}
                parameters={[{
                    type: 'path',
                    parameter: 'id',
                    value: user.agency.id
                }]}
                render={this.renderUI}
            />
        );
    }

    readonly renderUI = (renderProps) => {
        const { orderPrice } = this.props;

        if (renderProps.data) {
            const agency = renderProps.data;
            const discountByAgencyLevel = agencyUtils
                .getOrderDiscountByLevel(agency, orderPrice);

            return (
                <AntdRow>
                    <AntdCol span={18}>
                        <div>
                            <span>Bạn là thành viên của</span> {agency.level.name} nên được giảm {' '}
                            <DiscountValue>{agency.level.discountPercent}%</DiscountValue> giá trị là:
                        </div>
                        <Link to="/policy/agency">Xem chính sách thành viên của Furnitumaker</Link>
                    </AntdCol>
                    <AntdCol span={6}>
                        <ShippingCost>
                            -{formatCurrency(discountByAgencyLevel)}
                        </ShippingCost>
                    </AntdCol>
                </AntdRow>
            );
        }

        return <span>Đang tải chính sách dành cho đại lý...</span>;
    }
}