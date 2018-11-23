import * as React from 'react';

import { readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';
import { RouteMakerBase } from '@/routes/shared';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';

@readyState()
@withStoreValues()
export class RouteMaker extends RouteMakerBase {
    render() {
        if (!this.state.pageReady) {
            return null;
        }

        return (
            <Page>
                <DefaultLayout>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <ProductContainer />
                </DefaultLayout>
            </Page >
        );
    }
}