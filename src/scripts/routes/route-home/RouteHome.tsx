
import * as React from 'react';
import { RouteProps } from 'react-router';

import { Page, PageLoadingProps } from '@/components';
import { resfulFetcher, furnutureMaterialResources } from '@/restful';
import { CommonStoreProps } from '@/configs';
import { readyState, withStoreValues } from '@/app';

import {
    ProductTypeContainer,
    ProductDesignContainer,
    ProductContainer,
    ProductTypeGroupContainer
} from './containers';
import { DefaultLayout } from '@/layout';

@readyState()
@withStoreValues()
export class RouteHome extends React.Component<CommonStoreProps> {
    static readonly routeProps: RouteProps = {
        path: '/',
        exact: true
    };

    constructor(props: CommonStoreProps) {
        super(props);

        const { setStore } = props;

        setTimeout(
            () => setStore({ [nameof<PageLoadingProps>(o => o.showPageLoading)]: false }),
            500
        );
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <ProductContainer />
                </DefaultLayout>
            </Page>
        );
    }
}