import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth, policies, withStoreValues } from '@/app';
import { AntdButton } from '@/components';
import { CommonStoreProps } from '@/configs';
import { getNotificationTyleLabel, notificationMapToArray } from '@/domain';
import {
    AppNotification,
    queryNotifications
} from '@/firebase/firebaseNotificationDB';
import { ProfileLayoutContentBody } from '@/layout';
import { formatDate } from '@/utilities';

const UserNotificationListWrapper = styled.div`
    display: block;
`;

const UserNotificationItemWrapper = styled.div`
    display: flex;
    padding: 15px 0;
    &:not(:last-child) {
        border-bottom: 1px solid lightgray;
    }
`;

const UserNotificationItemContent = styled.div`
    padding: 0 30px;
    flex-grow: 1;
    p {
        margin-bottom: 0;
    }
`;

export interface UserNotificationListProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'notifications'> {
}

@withStoreValues<UserNotificationListProps>('notifications')
export class UserNotificationList extends React.PureComponent<UserNotificationListProps> {
    public render() {
        const notifications = notificationMapToArray(this.props.notifications);
        return (
            <UserNotificationListWrapper>
                <ProfileLayoutContentBody>
                    {notifications.map(o => (
                        <UserNotificationItemWrapper key={o.id}>
                            <div>
                                {formatDate(o.time, 'DD/MM/YYYY')} <br />
                                <small>{formatDate(o.time, 'HH:mm')}</small>
                            </div>
                            <UserNotificationItemContent>{this.renderListMeta(o)}</UserNotificationItemContent>
                        </UserNotificationItemWrapper>
                    ))}
                </ProfileLayoutContentBody>
                <div style={{ marginTop: 15 }}>
                    <AntdButton onClick={() => this.onReadMore(notifications[notifications.length - 1])}>
                        Xem thêm
                    </AntdButton>
                </div>
            </UserNotificationListWrapper>
        );
    }

    readonly onReadMore = async (lastItem: AppNotification) => {
        const { notifications, setStore } = this.props;
        const user = Auth.instance.currentUser;

        const isAdmin = policies.isAdminGroup(user);
        const ref = isAdmin ? 'root' : user.id;

        const nextNotifications = await queryNotifications(ref, { startAt: lastItem.id });
        const nextNotificationMap = new Map(notifications);

        for (const notif of nextNotifications) {
            nextNotificationMap.set(notif.id, notif);
        }

        setStore<CommonStoreProps>({
            notifications: nextNotificationMap
        });
    }

    readonly renderListMeta = (notification: AppNotification) => {
        switch (notification.type) {
            case 'new-order':
            case 'cancel-order':
            case 'change-order':
                const label = getNotificationTyleLabel(notification);
                return (
                    <p>
                        <Link to={`/profile/${notification.fromUser}`}>
                            {notification.fromUserName}
                        </Link> vừa {label} <Link to={`/orders/${notification.orderId}`}>
                            đơn hàng
                        </Link>
                    </p>
                );
            case 'update-order':
                return (
                    <p>
                        Thông tin <Link to={`/orders/${notification.orderId}`}>
                            đơn hàng
                        </Link> của bạn vừa được cập nhật
                    </p>
                );
            case 'new-order-transaction':
            default:
                return (
                    <p>
                        Lịch sử giao dịch của <Link to={`/orders/${notification.orderId}`}>
                            đơn hàng
                        </Link> vừa được cập nhật
                    </p>
                );
        }
    }
}
