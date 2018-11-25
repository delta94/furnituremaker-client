import * as React from 'react';
import styled from 'styled-components';

import { AntdCol, AntdRow, Container, Img } from '@/components';
import { mobileSize } from '@/configs';

const LandingFeatureWrapper = styled.div`
    display: 'block';
    padding: 50px 0;
    .item-wrapper {
        &:not(:last-child) {
            @media screen and (max-width: ${mobileSize}px) {
                margin-bottom: 24px;
            }
        }
    }
`;

const Item = styled.div`
    display: 'block';
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
        max-width: 50px;
        max-height: 50px;
    }
`;

const ImgWrapper = styled.div`
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgray;
    border-radius: 50%;
    margin-bottom: 30px;
    @media screen and (max-width: ${mobileSize}px) {
        margin-bottom: 15px;
    }
`;

const Title = styled.span`
    display: 'block';
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3D3D3D;
    max-width: 200px;
`;

const features = [{
    img: '/feature-1.png',
    title: '100% sofa - chair tính tùy biến cao',
    width: '40px'
}, {
    img: '/feature-2.png',
    title: 'chất lượng xuất khẩu giá cả trong nước',
    width: '40px'
}, {
    img: '/feature-3.png',
    title: '80 năm bảo hành trọn đời'
}, {
    img: '/feature-4.png',
    title: '100% đơn giao hàng miễn phí toàn quốc'
}];

export function LandingFeature() {
    return (
        <Container>
            <LandingFeatureWrapper>
                <AntdRow>
                    {
                        features.map(o => {
                            return (
                                <AntdCol className="item-wrapper" key={o.img} span={24} lg={6}>
                                    <Item>
                                        <ImgWrapper>
                                            <Img width={o.width} file={`/static/assets/${o.img}`} />
                                        </ImgWrapper>
                                        <Title>{o.title}</Title>
                                    </Item>
                                </AntdCol>
                            );
                        })
                    }
                </AntdRow>
            </LandingFeatureWrapper>
        </Container>
    );
}