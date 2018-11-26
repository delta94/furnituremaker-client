import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdDivider, Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    CartPaymentInfo,
    CartShippingInfo,
    CartSubmitOrder,
    ContactAndbBilling
} from '@/routes/desktop/route-cart/containers';

type RouteHomeProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteHomeProps>('setStore')
export class RouteCheckout extends AppPage<RouteHomeProps> {
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
                <div style={{ marginBottom: 5}} />
                <Container>
                    <CartShippingInfo />
                    <CartPaymentInfo />
                    <ContactAndbBilling />
                    <AntdDivider dashed={true} />
                    <CartSubmitOrder />
                </Container>
            </Page>
        );
    }
}