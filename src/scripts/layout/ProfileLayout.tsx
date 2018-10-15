import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AntdCol, AntdIcon, AntdRow, Container } from '@/components';

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
        color: ${(props: ProfileLayoutItemProps) => props.active ? '#FFC12E' : 'black'};
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
                        <ProfileHeader>
                            TÀI KHOẢN CỦA:
                        </ProfileHeader>
                        <ProfileLayoutMenu>
                            <ProfileLayoutItem active={true}>
                                <AntdIcon type="user" theme="outlined" />
                                <Link className="profile-menu-link" to="/profile">Thông tin tài khoản</Link>
                            </ProfileLayoutItem>
                            <ProfileLayoutItem>
                                <AntdIcon type="alert" theme="outlined" />
                                <Link className="profile-menu-link" to="/profile">Thông báo của tôi</Link>
                            </ProfileLayoutItem>
                            <ProfileLayoutItem>
                                <AntdIcon type="profile" theme="outlined" />
                                <Link className="profile-menu-link" to="/profile">Quản lý đơn hàng</Link>
                            </ProfileLayoutItem>
                            <ProfileLayoutItem>
                                <AntdIcon type="environment" theme="outlined" />
                                <Link className="profile-menu-link" to="/addresses">Sổ địa chỉ của tôi</Link>
                            </ProfileLayoutItem>
                            <ProfileLayoutItem>
                                <AntdIcon type="credit-card" theme="outlined" />
                                <Link className="profile-menu-link" to="/profile">Thông tin thanh toán</Link>
                            </ProfileLayoutItem>
                            <ProfileLayoutItem>
                                <AntdIcon type="heart" theme="outlined" />
                                <Link className="profile-menu-link" to="/profile">Sản phẩm yêu thích</Link>
                            </ProfileLayoutItem>
                        </ProfileLayoutMenu>
                    </AntdCol>
                    <AntdCol span={18}>
                        {props.children}
                    </AntdCol>
                </AntdRow>
            </Container>
        </ProfileLayoutWrapper>
    );
}