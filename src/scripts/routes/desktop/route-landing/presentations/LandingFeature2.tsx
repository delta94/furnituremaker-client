import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AntdCol, AntdRow, Container, Img } from '@/components';
import { mobileSize } from '@/configs';

const Header = styled.div`
    border-bottom: 1px solid #AFAFAF;
    height: 80px;
    text-align: center;
    font-weight: 900;
    line-height: 80px;
    font-size: 20px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3D3D3D;
    @media screen and (max-width: ${mobileSize}px) {
        height: auto;
        line-height: 1.5;
        padding: 24px;
        letter-spacing: 0;
    }
`;

const LandingFeature2Wrapper = styled.div`
    display: 'block';
    padding: 50px 0;
    @media screen and (max-width: ${mobileSize}px) {
        padding: 24px 0;
        padding-bottom: 50px;
    }
`;

const Item = styled.div`
    display: 'block';
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media screen and (max-width: ${mobileSize}px) {
        margin-bottom: 24px;
    }
    .index {
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background: #C4C4C4;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        margin-bottom: 15px;
    }
`;

const ImgWrapper = styled.div`
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    @media screen and (max-width: ${mobileSize}px) {
        margin-bottom: 0;
    }
`;

const Title = styled.span`
    font-weight: bold;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3D3D3D;
    margin-bottom: 15px;
`;

const Description = styled.p`
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.1em;
    max-width: 300px;
    color: #000000;
`;

const features = [{
    img: '/landing-furniture-1.png',
    title: 'CHỌN THIẾT KẾ',
    description: 'Chọn mẫu sản phẩm bạn yêu thích',
    width: '150px'
}, {
    img: '/landing-furniture-2.png',
    title: 'CHỌN MẪU VẢI',
    description: 'Chọn mẫu vải và khám phá sản phẩm của bạn sau khi đã thay vải',
    width: '150px'
}, {
    img: '/landing-furniture-3.png',
    description: 'Chọn mẫu chân và mẫu tay bạn mong muốn. Xem lại sản phẩm bạn đã thiết kế',
    title: 'chọn phụ kiện',
    width: '120px'
}];

export function LandingFeature2() {
    return (
        <React.Fragment>
            {
                window.innerWidth <= mobileSize ?
                    <Header>BẠN THIẾT KẾ<br /> CHÚNG TÔI SẢN XUẤT</Header> :
                    <Header>BẠN THIẾT KẾ - CHÚNG TÔI SẢN XUẤT</Header>
            }
            <Container>
                <LandingFeature2Wrapper>
                    <AntdRow>
                        {
                            features.map((o, index) => {
                                const i = index + 1;
                                return (
                                    <AntdCol key={o.img} span={24} lg={8}>
                                        <Item>
                                            <span className="index">{i}</span>
                                            <Title>{o.title}</Title>
                                            <ImgWrapper>
                                                <Img width={o.width} file={`/static/assets/${o.img}`} />
                                            </ImgWrapper>
                                            <Description>{o.description}</Description>
                                        </Item>
                                    </AntdCol>
                                );
                            })
                        }
                    </AntdRow>
                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                        <Link className="link-btn" to="/">KHÁM PHÁ NGAY</Link>
                    </div>
                </LandingFeature2Wrapper>
            </Container>
        </React.Fragment>
    );
}