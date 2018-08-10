import * as React from 'react';
import styled from 'styled-components';

import { Container, AntdIcon, AntdPopover, AntdBadge } from '@/components';
import { colorPrimary } from '@/configs';
import { Auth } from '@/app';
import { withCurrentUser, restfulStore, WithCurrentUserProps } from '@/restful';

import { HeaderCart } from './deafult-layout-header';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
    background-color: #3D3D3D;
    height: 60px;
`;

const HeaderContent = styled.div`
    display: flex;
`;

const HeaderLogo = styled.img`
    width: 60px;
    height: 60px;
`;

const HeaderDescription = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #FFFFFF;
    padding: 0 0 0 15px;
`;

const HeaderSearch = styled.div`
    height: 60px;
    flex-grow: 1;
`;

const HeaderButton = styled.div`
    height: 60px;
    width: 60px;
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

type DefaultLayoutHeaderProps = Partial<WithCurrentUserProps>;

@withCurrentUser(restfulStore)
export class DefaultLayoutHeader extends React.Component<DefaultLayoutHeaderProps> {
    render() {
        return (
            <HeaderWrapper>
                <Container>
                    <HeaderContent>
                        <HeaderLogo src="/static/assets/logo.svg" />
                        <HeaderDescription>
                            <span>Dễ dàng tùy biến sản phẩm</span>
                            <span>Thảnh thơi gom hàng với giá cực tốt</span>
                        </HeaderDescription>
                        <HeaderSearch />
                        <HeaderCart />
                        <AntdPopover
                            placement="bottomRight"
                            title="Tài Khoản"
                            content={
                                <React.Fragment>
                                    <HeaderPopoverButton>
                                        <Link to="/orders">
                                            Đơn hàng
                                        </Link>
                                    </HeaderPopoverButton>
                                    <HeaderPopoverButton>
                                        <a key="logout" onClick={Auth.instance.logout}>
                                            Đăng xuất
                                        </a>
                                    </HeaderPopoverButton>
                                </React.Fragment>
                            }
                        >
                            <HeaderButton>
                                <AntdIcon type="user" />
                            </HeaderButton>
                        </AntdPopover>
                    </HeaderContent>
                </Container>
            </HeaderWrapper >
        );
    }
}