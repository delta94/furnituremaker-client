import * as React from 'react';
import { RouteProps } from 'react-router';

import { readyState } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { OrderListContainer } from './containers';

@readyState()
export class RouteOrders extends React.Component<CommonStoreProps> {
    static readonly routeProps: RouteProps = {
        path: '/orders'
    };

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <OrderListContainer />
                </DefaultLayout>
            </Page>
        );
    }
}