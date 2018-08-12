import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { Page } from '@/components';

import { AppLogin } from './containers';

type RouteLoginProps = RouteComponentProps<{}>;

export class RouteLogin extends React.Component<RouteLoginProps> {
    static readonly routeProps: RouteProps = {
        path: '/login'
    };

    render() {
        const routeProps = Page.getRouteProps(this.props);
        return (
            <Page routeProps={routeProps}>
                <AppLogin />
            </Page>
        );
    }
}