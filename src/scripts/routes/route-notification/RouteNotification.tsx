import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    DefaultLayout,
    ProfileLayout,
    ProfileLayoutContentHeader
} from '@/layout';

import { UserNotificationList } from './presentations';

type RouteNotificationProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteNotificationProps>()
export class RouteNotification extends AppPage<RouteNotificationProps> {
    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProfileLayout>
                        <div>
                            <ProfileLayoutContentHeader>
                                THÔNG BÁO CỦA TÔI
                            </ProfileLayoutContentHeader>
                            <UserNotificationList />
                        </div>
                    </ProfileLayout>
                </DefaultLayout>
            </Page>
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item>
                    <Link to="/"><AntdIcon type="home" /></Link>
                </AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Thông báo của tôi</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}