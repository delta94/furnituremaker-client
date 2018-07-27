
import * as React from 'react';
import styled from 'styled-components';

import { FurnutureMaterial, productTypeGroupResources, restfulStore, resfulFetcher } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';
import { ProductTypeGroupList, Page } from '@/components';
import { RestfulRender } from 'react-restful';

import { ProductTypeContainer, ProductDesignContainer, ProductComponentsContainer } from './containers';

export class RouteHome extends React.Component {
    static routeProps = {
        path: '/'
    };

    render() {
        return (
            <Page>
                <RestfulRender
                    fetcher={resfulFetcher}
                    store={restfulStore}
                    resource={productTypeGroupResources.find}
                    parameters={[]}
                    render={(renderProps) => {
                        if (renderProps.data) {
                            return <ProductTypeGroupList productTypeGroups={renderProps.data} />;
                        }
                        return null;
                    }}
                />
                <ProductTypeContainer />
                <ProductDesignContainer />
                <ProductComponentsContainer />
            </Page>
        );
    }
}