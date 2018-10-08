import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdRow, Container, Img } from '@/components';

const LandingFeatureWrapper = styled.div`
    display: block;
    padding: 50px 0;
    background: #FDCD2F;
`;

const Item = styled.div`
    display: block;
`;

const Paragrap = styled.p`
    max-width: 350px;
    color: #fff;
    line-height: 20px;
`;

export function LandingProductDetail() {
    return (
        <LandingFeatureWrapper>
            <Container>
                <AntdRow>
                    <AntdCol span={12}>
                        <Item>
                            <h1 style={{fontWeight: 'bold'}}>CHI TIẾT SẢN PHẨM</h1>
                            <Paragrap>
                                Sofa với màu vải bạn yêu thích, bạn có thê đổi tay, chân
                                và đặt hàng số lượng mà không phải đợi chờ quá lâu! Giá cả hợp lý dành
                                riêng cho khách hàng đại lý và nhà thiết kế.
                            </Paragrap>
                        </Item>
                    </AntdCol>
                    <AntdCol span={12}>
                        <Item>
                            <Img
                                className="mw-100 w-100"
                                file="/static/assets/landing-product-detail.png"
                            />
                        </Item>
                </AntdCol>
                </AntdRow>
            </Container>
        </LandingFeatureWrapper>
    );
}