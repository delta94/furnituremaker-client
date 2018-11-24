import * as React from 'react';

import { readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { RouteMakerBase } from '@/routes/shared';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';

const tabs = [
    { title: 'First Tab' },
    { title: 'Second Tab' },
    { title: 'Third Tab' },
];
@readyState()
@withStoreValues()
export class RouteMaker extends RouteMakerBase {
    render() {
        if (!this.state.pageReady) {
            return null;
        }

        return (
            <Page>
                <ProductTypeGroupContainer />
                <ProductTypeContainer />
                <ProductDesignContainer />
                <ProductContainer />
            </Page >
        );
    }
}