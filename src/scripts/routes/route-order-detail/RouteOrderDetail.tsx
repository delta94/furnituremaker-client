import * as React from 'react';
import { RouteProps } from 'react-router';

import { AppRouteComponentProps, readyState } from '@/app';
import { Page } from '@/components';
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

        return (
            <Page>
                <DefaultLayout>
                    <OrderDetailContainer orderId={match.params.id} />
                </DefaultLayout>
            </Page>
        );
    }
}