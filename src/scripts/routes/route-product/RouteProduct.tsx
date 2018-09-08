import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { ProductDetail } from './containers';

type RouteProductProps = CommonStoreProps & RouteComponentProps<{}> & PageProps;

@readyState()
@withStoreValues()
export class RouteProduct extends React.Component<RouteProductProps> {
    render() {
        return (
            <Page routeProps={this.props}>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <Container>
                        <ProductDetail />
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item>
                    <Link to="/"><AntdIcon type="home" /></Link>
                </AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Xem sản phẩm</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}