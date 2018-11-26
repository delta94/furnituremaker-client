import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdProgress, AntdRow } from '@/components';
import { mobileSize } from '@/configs';
import {
    orderDetailUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

const CartDrawerHeaderWrapper = styled.div`
    background: #EFB416;
    padding: 30px 50px;
    font-size: 14px;
    @media screen and (max-width: ${mobileSize}px) {
        padding: 10px 1px;
        font-size: 11px;
    }
`;

const CartDrawerHeaderLabel = styled.span`
    display: block;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
`;

const ProgressBar = styled.div`
    display: flex;
`;

const ProgressBarItem = styled.div`
    padding: 0 10px;
    display: flex;
    &:nth-child(2) {
        padding: 0;
        flex-grow: 1;
    }
`;

const ShippingNotifiText = styled.div`
    color: ${(props) => props.color || '#E1E1E1'};
`;

export interface CartDrawerHeaderProps extends WithTempOrderDetails {
}

@withTempOrderDetails
export class CartDrawerHeader extends React.PureComponent<CartDrawerHeaderProps> {
    readonly freeShip = 20000000;

    public render() {
        const { orderDetails } = this.props;
        const total = orderDetailUtils.getTotalPrice(orderDetails);
        const freeShipPercent = this.getPrecentOf(this.freeShip, total);

        return (
            <CartDrawerHeaderWrapper>
                <CartDrawerHeaderLabel>
                    Miễn phí giao hàng nội thành HCM cho đơn hàng 20 triệu đồng
                </CartDrawerHeaderLabel>
                <AntdRow>
                    <AntdCol span={12}>
                        <ProgressBar>
                            <ProgressBarItem>
                                0 đ
                            </ProgressBarItem>
                            <ProgressBarItem>
                                <AntdProgress status="success" percent={freeShipPercent} showInfo={false} />
                            </ProgressBarItem>
                            <ProgressBarItem>
                                20 triệu đ
                            </ProgressBarItem>
                        </ProgressBar>
                    </AntdCol>
                    <AntdCol span={12}>
                        <ShippingNotifiText color={freeShipPercent >= 100 && '#fff'}>
                            Bạn đã được miễn phí vận chuyển!
                        </ShippingNotifiText>
                    </AntdCol>
                </AntdRow>
            </CartDrawerHeaderWrapper>
        );
    }

    readonly getPrecentOf = (x: number, y: number) => {
        if (y >= x) {
            return 100;
        }

        return y / x * 100;
    }
}
