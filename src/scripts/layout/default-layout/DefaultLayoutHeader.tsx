import * as React from 'react';
import styled from 'styled-components';

import { Container, AntdIcon, AntdPopover, AntdBadge } from '@/components';
import { colorPrimary } from '@/configs';
import { Auth } from '@/app/Auth';
import { withCurrentUser, restfulStore, WithCurrentUserProps } from '@/restful';

const HeaderWrapper = styled.div`
    margin: 0 0 30px 0;
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

const HeaderCartButtonWrapper = styled.div`
    padding: 0 0 0 12px;
`;

const HeaderCartButton = styled.span`
    width: 25px;
    height: 20px;
    border-radius: 4px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
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
                        <HeaderButton>
                            <HeaderCartButtonWrapper>
                                <AntdBadge count={0} showZero={true}>
                                    <HeaderCartButton>
                                        <AntdIcon type="shopping-cart" />
                                    </HeaderCartButton>
                                </AntdBadge>
                            </HeaderCartButtonWrapper>
                        </HeaderButton>
                        <AntdPopover
                            placement="bottomRight"
                            title="Tài Khoản"
                            content={[
                                <a key="logout" onClick={Auth.instance.logout}>
                                    Đăng xuất
                                </a>
                            ]}
                        >
                            <HeaderButton>
                                <AntdIcon type="user" />
                            </HeaderButton>
                        </AntdPopover>
                    </HeaderContent>
                </Container>
            </HeaderWrapper>
        );
    }
}