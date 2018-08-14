import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdDivider, AntdModal, AntdRow } from '@/components';
import { colorPrimary } from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    orderDetailUtils,
    orderUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const ShippingCost = styled.div`
    text-align: right;
    font-size: 18px;
    color: #000000;
`;

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

const ShippingDate = styled.div`
    text-align: right;
`;

interface CartDrawerFooterProps extends WithTempOrderDetails {
    readonly onCartDrawerClose: () => void;
}

@withTempOrderDetails(restfulStore)
export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails, onCartDrawerClose } = this.props;
        const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
        const shippingDate = orderUtils.getShippingDate();
        return (
            <div>
                <AntdRow>
                    <AntdCol span={12}>
                        <span>
                            Phí vận chuyển:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingCost>
                            0
                        </ShippingCost>
                    </AntdCol>
                    <AntdCol span={12}>
                        <span>
                            Tổng tiền:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <TotalPrice>
                            {formatCurrency(totalPrice)}
                        </TotalPrice>
                    </AntdCol>
                    <AntdCol span={12}>
                        <span>
                            Dự kiến giao hàng:
                        </span>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingDate>
                            {formatDate(shippingDate, 'DD/MM/YYYY')}
                        </ShippingDate>
                    </AntdCol>
                </AntdRow>
                <AntdDivider />
                <CreateOrderControl
                    orderDetails={orderDetails}
                    onOrderCreate={() => {
                        onCartDrawerClose();
                        AntdModal.success({
                            title: 'Đặt hàng thành công',
                            content: 'Nhân viên của Furniture Maker sẽ liên hệ với bạn trong thời gian sớm nhất!',
                            okText: 'Tiếp tục',
                            okType: 'default'
                        });
                    }}
                />
            </div>
        );
    }
}