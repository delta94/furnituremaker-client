import * as React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { readyState } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { OrderListContainer } from './containers';

@readyState()
export class RouteOrders extends React.Component<CommonStoreProps> {
    static readonly routeProps: RouteProps = {
        path: '/orders',
        exact: true
    };

    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <OrderListContainer />
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
                <AntdBreadcrumb.Item>Đơn hàng</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}