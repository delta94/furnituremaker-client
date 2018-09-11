import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { TransportFeeByCity } from './containers';

type RouteTransportPolicyProps = CommonStoreProps & RouteComponentProps<{}> & PageProps;

@readyState()
@withStoreValues()
export class RouteTransportPolicy extends AppPage<RouteTransportPolicyProps> {
    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <Container>
                        <TransportFeeByCity />
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
                <AntdBreadcrumb.Item>Chính sách vận chuyển</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}