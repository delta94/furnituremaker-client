import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { readyState, withStoreValues } from '@/app';
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

import {
    CartDivider,
    CartPaymentInfo,
    CartShippingInfo,
    CartSubmitOrder
} from './containers';

type RouteHomeProps = CommonStoreProps & RouteComponentProps<{}>;

@readyState()
@withStoreValues()
export class RouteCart extends React.Component<RouteHomeProps> {
    static readonly routeProps: RouteProps = {
        path: '/send-order',
        exact: true
    };

    constructor(props: RouteHomeProps) {
        super(props);
        const { setStore } = this.props;
        setStore({
            [nameof<CommonStoreProps>(o => o.drawerVisible)]: false
        });
    }

    render() {
        return (
            <Page routeProps={this.props}>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <Container>
                        <AntdRow type="flex" gutter={30}>
                            <AntdCol span={11}>
                                <CartShippingInfo />
                            </AntdCol>
                            <AntdCol span={2}>
                                <CartDivider />
                            </AntdCol>
                            <AntdCol span={11}>
                                <CartPaymentInfo />
                            </AntdCol>
                            <AntdCol span={24}>
                                <CartSubmitOrder />
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
                <AntdBreadcrumb.Item><AntdIcon type="home" /></AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Đặt hàng</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}