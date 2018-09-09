import { Location, UnregisterCallback } from 'history';
import * as React from 'react';
import {
    ResourceParameter,
    RestfulComponentRenderProps,
    RestfulRender,
    RestfulRenderProps
} from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    Product,
    productResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { HomeFeatureProductsController } from './home-feature-products';

const getDefaultSearchParams = (): ResourceParameter[] => [
    {
        type: 'query',
        parameter: `${nameof<Product>(o => o.isFeatureProduct)}`,
        value: true
    },
    {
        type: 'query',
        parameter: 'design',
        value: undefined
    }
];

interface HomeFeatureProductsProps extends
    Pick<CommonStoreProps, 'selectedProductType'>,
    Pick<CommonStoreProps, 'selectedProductDesign'>,
    Pick<CommonStoreProps, 'history'> {
}

interface HomeFeatureProductsState {
    readonly fetchedProducts: Product[];
    readonly fetchParams: ResourceParameter[];
}

@withStoreValues<HomeFeatureProductsProps>(
    'selectedProductType',
    'selectedProductDesign',
    'history'
)

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class HomeFeatureProducts extends React.PureComponent<HomeFeatureProductsProps, HomeFeatureProductsState> {
    // tslint:disable-next-line:readonly-keyword
    unregisterCallback: UnregisterCallback;

    constructor(props: HomeFeatureProductsProps) {
        super(props);
        const { history } = props;
        this.unregisterCallback = history.listen(this.onRouteChange);
        this.state = {
            fetchedProducts: [],
            fetchParams: getDefaultSearchParams()
        };
    }

    componentWillUnmount() {
        this.unregisterCallback();
    }

    readonly onRouteChange = (location: Location) => {
        const { fetchParams } = this.state;
        const prevFetchDesignParam = fetchParams.find(o => o.parameter === 'design');

        const currentSearchParams = new URLSearchParams(location.search);
        const currentDesignSortParam = currentSearchParams.get('design');

        if (prevFetchDesignParam.value === currentDesignSortParam) {
            return null;
        }

        prevFetchDesignParam.value = currentDesignSortParam;

        this.setState({
            fetchParams: [
                ...fetchParams
            ]
        });
    }

    readonly renderComponent = (renderProps: RestfulComponentRenderProps<Product[]>) => {
        if (
            !renderProps.data ||
            !renderProps.data.length
        ) {
            return null;
        }

        return (
            <HomeFeatureProductsController
                products={renderProps.data}
            />
        );
    }

    render() {
        const { selectedProductType, selectedProductDesign } = this.props;

        if (!selectedProductType
            || !selectedProductDesign
        ) {
            return null;
        }

        const { fetchParams } = this.state;

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={productResources.find}
                parameters={fetchParams}
                render={this.renderComponent}
            />
        );
    }
}