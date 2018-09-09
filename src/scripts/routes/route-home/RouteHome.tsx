import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import {
    HomeFeatureProducts,
    HomeProductDesign,
    HomeProductFilter,
    HomeProductList,
    HomeProductType,
    HomeProductTypeGroup
} from './containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>()
export class RouteHome extends React.Component<RouteHomeProps> {
    render() {
        const routeProps = Page.getRouteProps(this.props);
        return (
            <Page routeProps={routeProps}>
                <DefaultLayout>
                    <HomeProductTypeGroup />
                    <HomeProductType />
                    <HomeProductDesign />
                    <div
                        style={{
                            background: '#fff',
                            padding: '30px 0 30px 0'
                        }}
                    >
                        <HomeProductFilter />
                        <HomeFeatureProducts />
                        <HomeProductList />
                    </div>
                </DefaultLayout>
            </Page>
        );
    }
}