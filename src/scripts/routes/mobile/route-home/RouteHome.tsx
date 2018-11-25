import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';
import {
    HomeProductDesign,
    HomeProductFilter,
    HomeProductList,
    HomeProductType,
    HomeProductTypeGroup
} from '@/routes/desktop/route-home/containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>()
export class RouteHome extends AppPage<RouteHomeProps> {
    render() {
        return (
            <Page>
                <HomeProductTypeGroup />
                <HomeProductType />
                <HomeProductDesign />
                <div>
                    <HomeProductFilter />
                    <HomeProductList />
                </div>
            </Page>
        );
    }
}