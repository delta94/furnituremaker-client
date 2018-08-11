import * as React from 'react';
import { RouteProps } from 'react-router';

import { readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page, PageLoadingProps } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';
import { furnutureMaterialResources, resfulFetcher } from '@/restful';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';

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
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <ProductContainer />
                </DefaultLayout>
            </Page >
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item><AntdIcon type="home" /></AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Tự thiết kế</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}