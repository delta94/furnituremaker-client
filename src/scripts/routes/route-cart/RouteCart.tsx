import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import {
    AntdBreadcrumb,
    AntdCol,
    AntdIcon,
    AntdRow,
    Container,
    Page
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { CartPaymentInfo, CartProducts, CartShippingInfo } from './containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>('setStore')
export class RouteCart extends AppPage<RouteHomeProps> {
    constructor(props: RouteHomeProps) {
        super(props);
        const { setStore } = this.props;
        setStore({
            [nameof<CommonStoreProps>(o => o.drawerVisible)]: false
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <Container>
                        <AntdRow type="flex" gutter={30}>
                            <AntdCol span={12}>
                                <CartProducts />
                            </AntdCol>
                            <AntdCol span={12}>
                                <CartShippingInfo />
                                <CartPaymentInfo />
                            </AntdCol>
                        </AntdRow>
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
                <AntdBreadcrumb.Item>Đặt hàng</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}