
import * as React from 'react';

import { Page, PageLoadingProps } from '@/components';

import {
    ProductTypeContainer,
    ProductDesignContainer,
    ProductContainer,
    ProductTypeGroupContainer
} from './containers';
import { resfulFetcher, furnutureMaterialResources } from '@/restful';
import { CommonStoreProps } from '@/configs';
import { withStoreValues } from '@/app';

@withStoreValues()
export class RouteHome extends React.Component<CommonStoreProps> {
    static readonly routeProps = {
        path: '/'
    };

    constructor(props: CommonStoreProps) {
        super(props);
        
        const { setStore } = props;

        setTimeout(
            () => setStore({ [nameof<PageLoadingProps>(o => o.showPageLoading)]: false }),
            500
        );
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