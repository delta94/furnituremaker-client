import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { PageFetcher } from './route-pages-containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{ readonly slug: string }> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>()
export class RoutePages extends AppPage<RouteHomeProps> {
    render() {
        const { match } = this.props;
        const { slug } = match.params;

        return (
            <Page>
                <DefaultLayout>
                    <PageFetcher slug={slug} />
                </DefaultLayout>
            </Page>
        );
    }
}