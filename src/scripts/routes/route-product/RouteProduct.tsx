import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { PageProps, readyState, withStoreValues } from '@/app';
import { Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';

type RouteProductProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{ readonly id: number }> &
    PageProps;

@readyState()
@withStoreValues<CommonStoreProps>()
export class RouteProduct extends React.Component<RouteProductProps> {
    render() {
        const { match } = this.props;

        return (
            <Page routeProps={this.props}>
                <DefaultLayout>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <Container style={{ padding: '30px 0 0 0 ' }}>
                        <ProductContainer
                            productId={match.params.id}
                        />
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }
}