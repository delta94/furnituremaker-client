import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { AntdAffix, AntdCol, AntdIcon, AntdRow, Container } from '@/components';

export const ProfileLayoutContentHeader = styled.div`
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #D6D6D6;
    font-weight: bold;
`;

export const ProfileLayoutContentBody = styled.div`
    margin-top: 5px;
    background: #F7F7F7;
    padding: 15px;
`;

const ProfileLayoutWrapper = styled.div`
    display: block;
    .profile-menu-link {
        padding-left: 15px;
    }
`;

const ProfileLayoutMenu = styled.ul`
    display: block;
    padding: 30px;
`;

interface ProfileLayoutItemProps {
    readonly active?: boolean;
}

const ProfileLayoutItem = styled.li`
    display: block;
    margin-bottom: 15px;
    a {
        color: black;
        &.active {
            color: #FFC12E;
        }
    }
`;

const ProfileHeader = styled.div`
    background: #FFC12E;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    color: #000;
`;

// tslint:disable-next-line:no-any
export function ProfileLayout(props: { readonly children: any; }) {
    return (
        <ProfileLayoutWrapper>
            <Container>
                <AntdRow gutter={5}>
                    <AntdCol span={6}>
                        <AntdAffix offsetTop={75}>
                            <ProfileHeader>
                                TÀI KHOẢN CỦA:
                            </ProfileHeader>
                            <ProfileLayoutMenu>
                                <ProfileLayoutItem>
                                    <AntdIcon type="user" theme="outlined" />
                                    <NavLink activeClassName="active" className="profile-menu-link" to="/profile">
                                        Thông tin tài khoản
                                </NavLink>
                                </ProfileLayoutItem>
                                <ProfileLayoutItem>
                                    <AntdIcon type="alert" theme="outlined" />
                                    <NavLink activeClassName="active" className="profile-menu-link" to="/notifications">
                                        Thông báo của tôi
                                </NavLink>
                                </ProfileLayoutItem>
                                <ProfileLayoutItem>
                                    <AntdIcon type="profile" theme="outlined" />
                                    <NavLink activeClassName="active" className="profile-menu-link" to="/orders">
                                        Quản lý đơn hàng
                                </NavLink>
                                </ProfileLayoutItem>
                                <ProfileLayoutItem>
                                    <AntdIcon type="environment" theme="outlined" />
                                    <NavLink activeClassName="active" className="profile-menu-link" to="/addresses">
                                        Sổ địa chỉ của tôi
                                </NavLink>
                                </ProfileLayoutItem>
                                <ProfileLayoutItem>
                                    <AntdIcon type="heart" theme="outlined" />
                                    <NavLink
                                        activeClassName="active"
                                        className="profile-menu-link"
                                        to="/favorite-product"
                                    >
                                        Sản phẩm yêu thích
                                    </NavLink>
                                </ProfileLayoutItem>
                            </ProfileLayoutMenu>
                        </AntdAffix>
                    </AntdCol>
                    <AntdCol span={18}>
                        {props.children}
                    </AntdCol>
                </AntdRow>

            </Container>
        </ProfileLayoutWrapper>
    );
}