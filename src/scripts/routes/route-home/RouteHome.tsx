
import * as React from 'react';

import { Page } from '@/components';

import {
    ProductTypeContainer,
    ProductDesignContainer,
    ProductContainer,
    ProductTypeGroupContainer
} from './containers';

export class RouteHome extends React.Component {
    static readonly routeProps = {
        path: '/'
    };

    render() {
        return (
            <Page>
                <ProductTypeGroupContainer />
                <ProductTypeContainer />
                <ProductDesignContainer />
                <ProductContainer />
            </Page>
        );
    }
}