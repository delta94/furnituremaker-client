import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth, policies, withStoreValues } from '@/app';
import { AntdButton, AntdIcon, AntdTooltip } from '@/components';
import { CommonStoreProps } from '@/configs';
import { getNotificationTyleLabel, notificationMapToArray } from '@/domain';
import {
    AppNotification,
    isEndOfNotificationList,
    markNotificationNotViewed,
    markNotificationViewed,
    queryNotifications
} from '@/firebase/firebaseNotificationDB';
import { formatDate } from '@/utilities';

const UserNotificationListWrapper = styled.div`
    display: block;
`;

const UserNotificationItemWrapper = styled.div`
    display: flex;
    background: ${(props: { readonly viewed: boolean }) => props.viewed ? '#fff' : '#F7F7F7'};
    padding: 15px;
    &:hover {
        background: #f3f3f3;
    }
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

interface UserNotificationListState {
    readonly isLast: boolean;
    readonly loading: boolean;
}

@withStoreValues<UserNotificationListProps>('notifications')
export class UserNotificationList extends React.PureComponent<
UserNotificationListProps,
UserNotificationListState> {
    readonly state = { isLast: false, loading: false };

    public render() {
        const notifications = notificationMapToArray(this.props.notifications);
        const lastExistItem = notifications[notifications.length - 1];

        return (
            <UserNotificationListWrapper>
                <div>
                    {notifications.map(o => (
                        <UserNotificationItemWrapper
                            key={o.id}
                            viewed={o.viewedAt !== undefined}
                        >
                            <div>
                                {formatDate(o.time, 'DD/MM/YYYY')} <br />
                                <small>{formatDate(o.time, 'HH:mm')}</small>
                            </div>
                            <UserNotificationItemContent
                                onClick={() => {
                                    const ref = this.getRef();
                                    markNotificationViewed(ref, o.id);
                                }}
                            >
                                {this.renderListMeta(o)}
                            </UserNotificationItemContent>
                            <div>
                                {
                                    o.viewedAt &&
                                    (
                                        <AntdTooltip title="Đánh dấu chưa đọc">
                                            <a
                                                style={{ fontSize: 18 }}
                                                onClick={() => {
                                                    const ref = this.getRef();
                                                    markNotificationNotViewed(ref, o.id);
                                                }}
                                            >
                                                <AntdIcon type="bell" theme="twoTone" twoToneColor="#FFC12E" />
                                            </a>
                                        </AntdTooltip>
                                    )
                                }

                            </div>
                        </UserNotificationItemWrapper>
                    ))}
                </div>
                <div style={{ marginTop: 15 }}>
                    {
                        this.state.isLast ? null :
                            (
                                <AntdButton
                                    loading={this.state.loading}
                                    onClick={() => this.onReadMore(lastExistItem)}
                                >
                                    Xem thêm
                                </AntdButton>
                            )
                    }
                </div>
            </UserNotificationListWrapper>
        );
    }

    readonly getRef = () => {
        const user = Auth.instance.currentUser;

        const isAdmin = policies.isAdminGroup(user);
        const ref = isAdmin ? 'root' : user.id;
        return ref;
    }

    readonly onReadMore = async (lastItem: AppNotification) => {
        this.setState({ loading: true });

        const { notifications, setStore } = this.props;

        const ref = this.getRef();

        const nextNotifications = await queryNotifications(ref, { oldestKey: lastItem.id });
        const nextNotificationMap = new Map(notifications);

        const isLast = await isEndOfNotificationList(ref, nextNotifications[0].id);
        this.setState({ isLast, loading: false });

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
