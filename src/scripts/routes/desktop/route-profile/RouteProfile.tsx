import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { UserInfoFormControl } from '@/forms/user-info-form';
import {
    DefaultLayout,
    ProfileLayout,
    ProfileLayoutContentBody,
    ProfileLayoutContentHeader
} from '@/layout';

type RouteProfileProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteProfileProps>()
export class RouteProfile extends AppPage<RouteProfileProps> {
    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProfileLayout>
                        <div>
                            <ProfileLayoutContentHeader>
                                THÔNG TIN TÀI KHOẢN
                            </ProfileLayoutContentHeader>
                            <ProfileLayoutContentBody>
                                <UserInfoFormControl />
                            </ProfileLayoutContentBody>
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
                <AntdBreadcrumb.Item>Thông tin tài khoản</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}