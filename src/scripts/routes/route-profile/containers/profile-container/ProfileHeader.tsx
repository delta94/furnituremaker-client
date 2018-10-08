import PageHeader from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import styled from 'styled-components';

import { Auth } from '@/app';
import { colorPrimary } from '@/configs';
import { withOrderTransactionsByOrder } from '@/restful';
import { formatDate } from '@/utilities';

const AntdDescriptionList = require('ant-design-pro/lib/DescriptionList');

const PageHeaderWrapper = styled.div`
    margin: 0 0 30px 0;
`;

const OrderId = styled.span`
    color: ${colorPrimary};
`;

export interface ProfileHeaderProps {
}

@withOrderTransactionsByOrder()
export class ProfileHeader extends React.Component<ProfileHeaderProps> {
    render() {
        const user = Auth.instance.currentUser;
        return (
            <PageHeaderWrapper>
                <PageHeader
                    title={<OrderId>{user.email}</OrderId>}
                    content={(
                        <AntdDescriptionList title={`Chủ tài khoản: ${user.name}`} size="small" col={2}>
                            <AntdDescriptionList.Description term="Tên đăng nhập">
                                {user.username}
                            </AntdDescriptionList.Description>
                            <AntdDescriptionList.Description term="Ngày tạo">
                                {formatDate(user.createdAt, 'DD-MM-YYYY HH:mm')}
                            </AntdDescriptionList.Description>
                        </AntdDescriptionList>
                    )}
                />
            </PageHeaderWrapper>
        );
    }
}