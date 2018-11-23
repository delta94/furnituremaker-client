import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { AddressBookFormControl } from '@/forms/address-book';
import {
    DefaultLayout,
    ProfileLayout,
    ProfileLayoutContentBody,
    ProfileLayoutContentHeader
} from '@/layout';

import { AddressBookContainer } from './containers';

type RouteAddressBookProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteAddressBookProps>()
export class RouteAddressBook extends AppPage<RouteAddressBookProps> {
    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProfileLayout>
                        <div>
                            <ProfileLayoutContentHeader>
                                SỔ ĐỊA CHỈ CỦA TÔI
                            </ProfileLayoutContentHeader>
                            <ProfileLayoutContentBody>
                                <AddressBookContainer />
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
                <AntdBreadcrumb.Item>Sổ địa chỉ của tôi</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}