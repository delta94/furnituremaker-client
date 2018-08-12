import * as React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppRouteComponentProps, readyState } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { DefaultLayout } from '@/layout';

import { OrderDetailContainer } from './containers';

type RouteOrderDetailProps = AppRouteComponentProps<{ readonly id: string }>;

@readyState()
export class RouteOrderDetail extends React.Component<RouteOrderDetailProps> {
    static readonly routeProps: RouteProps = {
        path: '/orders/:id'
    };

    render() {
        const { match } = this.props;
        const routeProps = Page.getRouteProps(this.props);

        return (
            <Page routeProps={routeProps}>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <OrderDetailContainer orderId={match.params.id} />
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
                <AntdBreadcrumb.Item>
                    <Link to="/orders">Đơn hàng</Link>
                </AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>
                    Chi tiết đơn hàng
                </AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}