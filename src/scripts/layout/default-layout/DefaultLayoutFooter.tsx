import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container, Img } from '@/components';

const FooterWrapper = styled.div`
    background: #EFEFEF;
    padding: 30px 0;

    .page-menu {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;
        &-title {
            margin-top: 24px;
            display: block;
            margin-bottom: 15px;
            &:after {
                content: '';
                height: 2px;
                width: 50px;
                background: #D59B01;
                display: block;
                line-height: 2;
            }
        }
        li {
            margin-bottom: 6px;
            a {
                color: darkgray;
                &:hover {
                    color: #D59B01;
                }
            }
        }
    }
`;

const FooterWrapperRow = styled.div`
    background: #EFEFEF;
`;

export function DefaultLayoutFooter() {
    return (
        <FooterWrapper>
            <Container>
                <FooterWrapperRow>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: 2 }}>
                            <div style={{ marginBottom: 5 }}>
                                <Img height="40" file="/static/assets/footer-logo.png" />
                            </div>
                            <p style={{ color: '#979797' }}>
                                © furnituremaker • HoChiMinh, VietNam • Tel: 1-888-345-6789
                            <br />
                                Copyright © 2018 Tri Minh Co,ltd.
                            </p>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <span className="page-menu-title">CHÍNH SÁCH</span>
                            <ul className="page-menu">
                                <li>
                                    <Link to="/pages/chinh-sach-bao-hanh">
                                        Bảo hành
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pages/chinh-sach-van-chuyen">
                                        Vận chuyển
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pages/chinh-sach-van-chuyen">
                                        Thành viên
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pages/cham-soc-san-pham">
                                        Chăm sóc sản phẩm
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </FooterWrapperRow>
            </Container>
        </FooterWrapper>
    );
}