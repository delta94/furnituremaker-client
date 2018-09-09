import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { PageProps } from '@/app';
import { Page } from '@/components';

import { AppLogin } from './containers';

type RouteLoginProps = RouteComponentProps<{}> & PageProps;

export class RouteLogin extends React.Component<RouteLoginProps> {
    render() {
        return (
            <Page routeProps={this.props}>
                <AppLogin />
            </Page>
        );
    }
}