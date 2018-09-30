import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth } from '@/app';
import { AntdDivider, AntdIcon, Container } from '@/components';

const DefaultLayoutTopbarWrapper = styled.div`
   background: #D59B01; 
`;

const DefaultLayoutTopbarContent = styled.div`
   display: flex;
   >div:first-child {
       flex-grow: 1;
       line-height: 50px;
       color: white;
   }
`;

const Menu = styled.ul`
    list-style: none;
    margin: 0;
    text-align: right;
    .link {
        color: white;
        line-height: 50px;
        &:not(:last-child) {
            margin-right: 50px;
        }
    }
`;

export class DefaultLayoutTopbar extends React.Component {
    render() {
        return (
            <DefaultLayoutTopbarWrapper>
                <Container>
                    <DefaultLayoutTopbarContent>
                        <div>
                            Xin chào, {Auth.instance.currentUser.name}!
                        </div>
                        <Menu>
                            <Link to="/maker" className="link">
                                <AntdIcon type="bulb" theme="outlined" /> Tự thiết kế
                            </Link>
                            <Link to="/orders" className="link">
                                <AntdIcon type="copy" /> Đơn hàng
                            </Link>
                        </Menu>
                    </DefaultLayoutTopbarContent>
                </Container>
            </DefaultLayoutTopbarWrapper>
        );
    }
}