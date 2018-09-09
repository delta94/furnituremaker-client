import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { Product } from '@/restful';

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
    readonly product: Product;
}

export class HomeProductTransport extends React.PureComponent<ProductTransportProps> {
    public render() {
        return (
            <ProductTransportWrapper>
                <ProductTransportIcon>
                    <Img
                        file="/static/assets/transport-car-icon.png"
                    />
                </ProductTransportIcon>
                <ProductTransportContent>
                    Đặt hàng hôm nay dự kiến giao hàng vào 18/7/2016
                    <div style={{ fontSize: 20 }}>
                        Nhận hàng trong <b>2 ngày</b>
                    </div>
                </ProductTransportContent>
            </ProductTransportWrapper>
        );
    }
}
