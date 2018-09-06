import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { readyState, withStoreValues } from '@/app';
import { Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import {
    HomeProductDesign,
    HomeProductType,
    HomeProductTypeGroup
} from './containers';

type RouteHomeProps = CommonStoreProps & RouteComponentProps<{}>;

@readyState()
@withStoreValues()
export class RouteHome extends React.Component<RouteHomeProps> {
    static readonly routeProps: RouteProps = {
        path: '/',
        exact: true
    };

    constructor(props: RouteHomeProps) {
        super(props);
    }

    render() {
        const routeProps = Page.getRouteProps(this.props);
        return (
            <Page routeProps={routeProps}>
                <DefaultLayout>
                    <HomeProductTypeGroup />
                    <HomeProductType />
                    <Container>
                        <HomeProductDesign/>
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }
}