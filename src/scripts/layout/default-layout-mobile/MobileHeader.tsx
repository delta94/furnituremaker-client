import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AntdAffix, AntdIcon, Container } from '@/components';

import { DrawerControl } from './mobile-header';
import { IconWrapper } from './mobile-header/IconWrapper';

const HeaderWrapper = styled.div`
    background-color: #3D3D3D;
    height: 54px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 5px rgba(57, 63, 72, 0.3);
`;

const HeaderContent = styled.div`
    display: flex;
`;

const HeaderLogo = styled.img`
    width: 40px;
    height: 40px;
`;

const HeaderDescription = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 0 0 5px;
    flex-grow: 1;
    .header-text {
        color: #FFFFFF;
        font-size: 18px;
    }
`;

export class MobileHeader extends React.PureComponent {
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
                                <h1 className="header-text">Furniture Maker</h1>
                            </HeaderDescription>
                            <IconWrapper>
                                <Link to="/maker"><AntdIcon type="shopping" /></Link>
                            </IconWrapper>
                            <DrawerControl />
                        </HeaderContent>
                    </Container>
                </HeaderWrapper >
            </AntdAffix>
        );
    }
}