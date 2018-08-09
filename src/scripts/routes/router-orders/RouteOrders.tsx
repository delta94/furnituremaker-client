import * as React from 'react';
import { RouteProps } from 'react-router';

import { readyState } from '@/app';
import { CommonStoreProps } from '@/configs';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

@readyState()
export class RouteOrders extends React.Component<CommonStoreProps> {
    static readonly routeProps: RouteProps = {
        path: '/orders'
    };

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <div />
                </DefaultLayout>
            </Page>
        );
    }
}