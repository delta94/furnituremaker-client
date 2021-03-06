import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { orderUtils, Product } from '@/restful';
import { formatDate } from '@/utilities';

const ProductTransportWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ProductTransportIcon = styled.div`
    padding: 10px 20px 10px 0;
`;

const ProductTransportContent = styled.div`
    line-height: 1.5;
`;

export interface InventoryProductTransportProps {
    readonly product: Product;
}

export class InventoryProductTransport extends React.PureComponent<InventoryProductTransportProps> {
    public render() {
        const shippingDate = orderUtils.getShippingDate({
            inventoryProduct: true
        });

        return (
            <ProductTransportWrapper>
                <ProductTransportIcon>
                    <Img
                        file="/static/assets/transport-car-icon.png"
                    />
                </ProductTransportIcon>
                <ProductTransportContent>
                    Đặt hàng hôm nay dự kiến giao hàng vào {formatDate(shippingDate, 'DD/MM/YYYY')}
                    <div style={{ fontSize: 20 }}>
                        Nhận hàng trong <b>2 ngày</b>
                    </div>
                    Miễn phí ship nội thành với đơn hàng trên 20 triệu *
                </ProductTransportContent>
            </ProductTransportWrapper>
        );
    }
}
