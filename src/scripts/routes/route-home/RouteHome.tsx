
import * as React from 'react';

import { Page } from '@/components';

import {
    ProductTypeContainer,
    ProductDesignContainer,
    ProductContainer,
    ProductTypeGroupContainer
} from './containers';
import { resfulFetcher, furnutureMaterialResources } from '@/restful';

export class RouteHome extends React.Component {
    static readonly routeProps = {
        path: '/'
    };

    constructor(props: object) {
        super(props);
    }
    
    componentDidMount() {
        resfulFetcher.fetchResource(furnutureMaterialResources.find, []);
    }

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