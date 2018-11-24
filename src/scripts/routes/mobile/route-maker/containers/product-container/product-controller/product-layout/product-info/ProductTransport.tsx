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

export interface ProductTransportProps {
}

export class ProductTransport extends React.PureComponent<ProductTransportProps> {
    public render() {
        const shippingDate = orderUtils.getShippingDate({
            inventoryProduct: false
        });

        return (
            <ProductTransportWrapper>
                <ProductTransportIcon>
                    <Img
                        file="/static/assets/transport-car-icon.png"
                    />
                </ProductTransportIcon>
                <ProductTransportContent>
                    Dự kiến giao hàng vào {formatDate(shippingDate, 'DD/MM/YYYY')}
                    <div style={{ fontSize: 18 }}>
                        Nhận hàng trong <b>15 ngày</b>
                    </div>
                    Miễn phí ship nội thành với đơn hàng trên 20 triệu *
                </ProductTransportContent>
            </ProductTransportWrapper>
        );
    }
}
