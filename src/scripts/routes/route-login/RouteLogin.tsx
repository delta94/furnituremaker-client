import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, withStoreValues } from '@/app';
import { Page } from '@/components';
import { clearToken } from '@/configs';

import { AppLogin } from './containers';

type RouteLoginProps = RouteComponentProps<{}> & PageProps;

@withStoreValues()
export class RouteLogin extends AppPage<RouteLoginProps> {
    constructor(props: RouteLoginProps) {
        super(props);
        
        clearToken();
    }

    render() {
        return (
            <Page>
                <AppLogin />
            </Page>
        );
    }
}