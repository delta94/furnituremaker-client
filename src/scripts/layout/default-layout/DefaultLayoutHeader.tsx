import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth } from '@/app';
import { AntdAffix, AntdIcon, AntdPopover, Container } from '@/components';
import { colorPrimary } from '@/configs';
import { getProfileRoutePath } from '@/routes';

import { HeaderCart, HeaderNotification } from './deafult-layout-header';

const HeaderWrapper = styled.div`
    background-color: #3D3D3D;
    height: 70px;
`;

const HeaderContent = styled.div`
    display: flex;
`;

const HeaderLogo = styled.img`
    width: 50px;
    height: 50px;
    margin-top: 10px;
`;

const HeaderDescription = styled.div`
    height: 70px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #FFFFFF;
    padding: 0 0 0 15px;
`;

const HeaderSearch = styled.div`
    height: 70px;
    flex-grow: 1;
`;

const HeaderButton = styled.div`
    text-align: center;
    height: 70px;
    min-width: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #FFFFFF;
    transition: all .2s;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        background-color: ${colorPrimary};
    }
`;

const HeaderPopoverButton = styled.div`
    margin: 0 0 8px 0;
`;

export class DefaultLayoutHeader extends React.PureComponent {
    render() {
        return (
            <AntdAffix>
                <HeaderWrapper id="header">
                    <Container>
                        <HeaderContent>
                            <Link to="/">
                                <HeaderLogo src="/static/assets/logo.png" />
                            </Link>
                            <HeaderDescription>
                                <span>Dễ dàng tùy biến sản phẩm</span>
                                <span>Thảnh thơi gom hàng với giá cực tốt</span>
                            </HeaderDescription>
                            <HeaderSearch />
                            <AntdPopover
                                title="Tài Khoản"
                                content={
                                    <React.Fragment>
                                        <HeaderPopoverButton>
                                            <Link to={getProfileRoutePath()}>
                                                Thông tin tài khoản
                                            </Link>
                                        </HeaderPopoverButton>
                                        <HeaderPopoverButton>
                                            <a onClick={Auth.instance.logout}>
                                                Đăng xuất
                                            </a>
                                        </HeaderPopoverButton>
                                    </React.Fragment>
                                }
                            >
                                <HeaderButton>
                                    <span>
                                        <AntdIcon type="user" />
                                    </span>
                                </HeaderButton>
                            </AntdPopover>
                            <HeaderNotification />
                            <HeaderCart />
                        </HeaderContent>
                    </Container>
                </HeaderWrapper >
            </AntdAffix>
        );
    }
}