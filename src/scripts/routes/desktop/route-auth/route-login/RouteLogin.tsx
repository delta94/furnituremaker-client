import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, AppPageProps, PageProps, withStoreValues } from '@/app';
import { Page } from '@/components';
import { clearToken, CommonStoreProps } from '@/configs';

import { AppLogin } from './containers';

type RouteLoginProps = Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@withStoreValues()
export class RouteLogin extends AppPage<RouteLoginProps & AppPageProps> {
    constructor(props: RouteLoginProps) {
        super(props);

        clearToken();
    }

    render() {
        return (
            <Page backgound="#FFC12E">
                <AppLogin />
            </Page> 
        );
    }
}