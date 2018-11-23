import * as React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppRouteComponentProps, PageProps, readyState } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { DefaultLayout, ProfileLayout } from '@/layout';

import { OrderDetailContainer } from './containers';

type RouteOrderDetailProps = AppRouteComponentProps<{ readonly id: string }> & PageProps;

@readyState()
export class RouteOrderDetail extends React.Component<RouteOrderDetailProps> {
    render() {
        const { match } = this.props;
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProfileLayout>
                        <OrderDetailContainer orderId={match.params.id} />
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