import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';

export interface RouteParams {
    readonly productCode: string;
}

type RouteProductProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<RouteParams> &
    PageProps;

@readyState()
@withStoreValues<CommonStoreProps>()
export class RouteProduct extends AppPage<RouteProductProps> {
    render() {
        const { match } = this.props;

        return (
            <Page>
                <DefaultLayout>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <Container style={{ padding: '30px 0 0 0 ' }}>
                        <ProductContainer
                            productCode={+match.params.productCode}
                        />
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }
}