import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { PageProps, readyState, withStoreValues } from '@/app';
import { Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import {
    HomeProductDesign,
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
                    <Container>
                        <HomeProductDesign />
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }
}