import './HeaderNotification.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth, policies, withStoreValues } from '@/app';
import { AntdBadge, AntdIcon, AntdList, AntdPopover } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import {
    AppNotification,
    markNotificationViewed
} from '@/firebase/firebaseNotificationDB';
import { formatDate } from '@/utilities';

const orderBy = require('lodash/orderBy');

const HeaderNotificationButtonWrapper = styled.div`
    height: 60px;
    width: 60px;
    color: #FFFFFF;
    transition: all .2s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        background-color: ${colorPrimary};
    }
`;

const ListItemWrapper = styled.div`
    &:not(:last-child) {
        border-bottom: 1px dashed lightgray;
    }
`;

const HeaderNotificationBadgeWapper = styled.span`
    width: 40px;
    position: relative;
    transform: translateX(-50%);
    left: 50%;
`;

const HeaderNotificationBadge = styled.span`
    width: 25px;
    height: 20px;
    border-radius: 4px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
`;

type DefaultLayoutHeaderProps =
    Pick<CommonStoreProps, 'notifications'>;

@withStoreValues<DefaultLayoutHeaderProps>('notifications')
export class HeaderNotification extends React.PureComponent<DefaultLayoutHeaderProps> {
    readonly notificationMapToArray = (notifications: DefaultLayoutHeaderProps['notifications']) => {
        const array = Array.from(notifications.values());
        return orderBy(array, 'time', 'desc');
    }

    readonly renderListMeta = (notification: AppNotification) => {
        switch (notification.type) {
            case 'new-order':
                return (
                    <AntdList.Item.Meta
                        title={(
                            <p>
                                <Link to={`/profile/${notification.fromUser}`}>
                                    {notification.fromUserName}
                                </Link> vừa đặt một <Link to={`/orders/${notification.orderId}`}>
                                    đơn hàng
                                </Link>
                            </p>
                        )}
                        description={(
                            <small>
                                {`Vào lúc ${formatDate(notification.time, 'HH:mm DD/MM/YYYY')}`}
                            </small>
                        )}
                    />
                );
            case 'new-order-transaction':
            default:
                return (
                    <AntdList.Item.Meta
                        title={(
                            <p>
                                Thông tin giao dịch <Link to={`/orders/${notification.orderId}`}>
                                    đơn hàng
                                </Link> của bạn vừa được cập nhật
                            </p>
                        )}
                        description={(
                            <small>
                                {`Vào lúc ${formatDate(notification.time, 'HH:mm DD/MM/YYYY')}`}
                            </small>
                        )}
                    />
                );
        }
    }

    readonly onNotificationItemClick = (notification: AppNotification) => {
        const isAdmin = policies.isAdminGroup();
        markNotificationViewed(
            isAdmin ? 'root' : Auth.instance.currentUser.id,
            notification.id
        );
    }

    readonly getNotificationList = () => {
        const { notifications } = this.props;
        return (
            <div className="header-notification">
                <AntdList
                    itemLayout="horizontal"
                    dataSource={this.notificationMapToArray(notifications)}
                    renderItem={(notification: AppNotification) => (
                        <ListItemWrapper
                            onClick={() => this.onNotificationItemClick(notification)}
                        >
                            <AntdList.Item
                                className={classNames({
                                    new: notification.viewedAt === undefined
                                })}
                            >
                                {this.renderListMeta(notification)}
                            </AntdList.Item>
                        </ListItemWrapper>
                    )}
                />
            </div>
        );
    }

    readonly countUnreadNotifications = () => {
        const { notifications } = this.props;
        const notificationArray = this.notificationMapToArray(notifications);
        const unreadNotifications = notificationArray.filter(o => !o.viewedAt);
        return unreadNotifications ? unreadNotifications.length : 0;
    }

    render() {
        const { notifications } = this.props;
        
        return (
            <AntdPopover
                title="Thông báo"
                content={(notifications.size > 0) ? this.getNotificationList() : 'Không có thông báo nào'}

            >
                <HeaderNotificationButtonWrapper>
                    <HeaderNotificationBadgeWapper>
                        <AntdBadge
                            count={this.countUnreadNotifications()}
                            showZero={true}
                            style={{ backgroundColor: '#52c41a' }}
                        >
                            <HeaderNotificationBadge>
                                <AntdIcon type="notification" />
                            </HeaderNotificationBadge>
                        </AntdBadge >
                    </HeaderNotificationBadgeWapper>
                </HeaderNotificationButtonWrapper>
            </AntdPopover>
        );
    }
}