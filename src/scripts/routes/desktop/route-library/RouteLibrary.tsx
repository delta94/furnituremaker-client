import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { LibraryMaterials } from './containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>()
export class RouteLibrary extends AppPage<RouteHomeProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    <LibraryMaterials />
                </DefaultLayout>
            </Page>
        );
    }
}