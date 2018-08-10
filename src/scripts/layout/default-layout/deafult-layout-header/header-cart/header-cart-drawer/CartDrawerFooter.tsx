import * as React from 'react';
import { withTempOrderDetails, WithTempOrderDetails, restfulStore, orderDetailUtils } from '@/restful';
import { CreateOrderControl } from '@/forms/create-order';
import { AntdModal, AntdRow, AntdCol, AntdDivider } from '@/components';
import styled from 'styled-components';
import { formatCurrency } from '@/utilities';
import { colorPrimary } from '@/configs';

const TotalPrice = styled.div`
    text-align: right;
    font-size: 20px;
    color: ${colorPrimary};
`;

interface CartDrawerFooterProps extends WithTempOrderDetails {
    readonly onCartDrawerClose: () => void;
}

@withTempOrderDetails(restfulStore)
export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails, onCartDrawerClose } = this.props;
        const totalPrice = orderDetailUtils.getTotalPrice(orderDetails);
        return (
            <div>
                <AntdRow>
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