import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { PageProps, readyState } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { OrderListContainer, OrderPageHeader } from './containers';

type RouteOrdersProps = CommonStoreProps & RouteComponentProps<{}> & PageProps;

@readyState()
export class RouteOrders extends React.Component<RouteOrdersProps> {
    render() {
        const routeProps = Page.getRouteProps(this.props);

        return (
            <Page routeProps={routeProps}>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <OrderPageHeader />
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