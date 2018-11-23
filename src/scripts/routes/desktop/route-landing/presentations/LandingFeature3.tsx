import Button from 'antd/lib/button';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AntdCol, AntdRow, Container, Img } from '@/components';

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
`;

const LandingFeature3Wrapper = styled.div`
    display: block;
    padding: 50px 0;
`;

const Item = styled.div`
    display: 'block';
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
    img: '/landing-select-design.png',
    title: 'CHỌN THIẾT KẾ',
    description: 'Chọn mẫu sản phẩm bạn yêu thích',
    width: '50px'
}, {
    img: '/landing-select-color.png',
    title: 'CHỌN MÀU',
    description: 'Chọn màu cho sản phẩm',
    width: '150px'
}, {
    img: '/landing-select-quantity.png',
    description: 'Tăng số lượng sản phẩm để nhận giá thành ưu đãi.',
    title: 'CHỌN SỐ LƯỢNG',
    width: '150px'
}];

export function LandingFeature3() {
    return (
        <React.Fragment>
            <Header>BẠN THIẾT KẾ - CHÚNG TÔI SẢN XUẤT</Header>
            <Container>
                <LandingFeature3Wrapper>
                    <AntdRow>
                        {
                            features.map((o, index) => {
                                const i = index + 1;
                                return (
                                    <AntdCol key={o.img} span={8}>
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
                    <div style={{textAlign: 'center', marginTop: 30}}>
                        <Link className="link-btn" to="/">KHÁM PHÁ NGAY</Link>
                    </div>
                </LandingFeature3Wrapper>
            </Container>
        </React.Fragment>
    );
}