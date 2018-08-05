import * as React from 'react';
import { RouteProps } from 'react-router';

import { Page } from '@/components';

import { AppLogin } from './containers';

export class RouteLogin extends React.Component {
    static readonly routeProps: RouteProps = {
        path: '/login'
    };

    render() {
        return (
            <Page>
                <AppLogin />
            </Page>
        );
    }
}