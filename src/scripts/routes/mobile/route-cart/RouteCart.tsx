import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    CartDrawerContent,
    CartDrawerFooter,
    CartDrawerHeader
} from '@/layout/default-layout/deafult-layout-header/header-cart/header-cart-drawer';

type RouteLandingProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteLandingProps>()
export class RouteCart extends AppPage<RouteLandingProps> {
    render() {
        return (
            <Page>
                <CartDrawerHeader />
                <CartDrawerContent mode="default" />
                <CartDrawerFooter />
            </Page>
        );
    }
}