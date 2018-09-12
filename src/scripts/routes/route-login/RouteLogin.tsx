import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { AppPage, PageProps, withStoreValues } from '@/app';
import { Page } from '@/components';

import { AppLogin } from './containers';

type RouteLoginProps = RouteComponentProps<{}> & PageProps;

@withStoreValues()
export class RouteLogin extends AppPage<RouteLoginProps> {
    render() {
        return (
            <Page>
                <AppLogin />
            </Page>
        );
    }
}