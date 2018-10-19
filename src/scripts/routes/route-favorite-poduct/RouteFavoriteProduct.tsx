import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    DefaultLayout,
    ProfileLayout,
    ProfileLayoutContentBody,
    ProfileLayoutContentHeader
} from '@/layout';

type RouteAddressBookProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteAddressBookProps>()
export class RouteFavoriteProduct extends AppPage<RouteAddressBookProps> {
    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProfileLayout>
                        <div>
                            <ProfileLayoutContentHeader>
                                SẢN PHẨM YÊU THÍCH
                            </ProfileLayoutContentHeader>
                            <ProfileLayoutContentBody>
                                Chưa có sản phẩm nào...
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
                <AntdBreadcrumb.Item>Sản phẩm yêu thích</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}