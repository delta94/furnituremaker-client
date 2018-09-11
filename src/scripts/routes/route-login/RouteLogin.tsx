import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { AppPage, PageProps } from '@/app';
import { Page } from '@/components';

import { AppLogin } from './containers';

type RouteLoginProps = RouteComponentProps<{}> & PageProps;

export class RouteLogin extends AppPage<RouteLoginProps> {
    render() {
        return (
            <Page>
                <AppLogin />
            </Page>
        );
    }
}