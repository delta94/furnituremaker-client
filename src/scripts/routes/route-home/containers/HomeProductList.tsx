import { Location, UnregisterCallback } from 'history';
import * as React from 'react';
import {
    RequestParameter,
    RestfulComponentRenderProps,
    RestfulRender
} from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { Product, productResources, restfulFetcher } from '@/restful';

import {
    HomeProductListController,
    HomeProductListViewMoreBtn
} from './home-product-list';

const getDefaultSearchParams = (): RequestParameter[] => [
    {
        type: 'query',
        parameter: '_limit',
        value: 6
    },
    {
        type: 'query',
        parameter: 'design',
        value: undefined
    },
    {
        type: 'query',
        parameter: '_sort',
        value: undefined
    },
    {
        type: 'query',
        parameter: '_start',
        value: undefined
    }
];

interface HomeProductListProps extends
    Pick<CommonStoreProps, 'selectedProductType'>,
    Pick<CommonStoreProps, 'selectedProductDesign'>,
    Pick<CommonStoreProps, 'history'> {
}

interface HomeProductListState {
    readonly prevFetchedProducts?: Product[];
    readonly fetchedProducts: Product[];
    readonly fetchParams: RequestParameter[];
}

@withStoreValues<HomeProductListProps>(
    'selectedProductType',
    'selectedProductDesign',
    'history'
)
export class HomeProductList extends React.PureComponent<HomeProductListProps, HomeProductListState> {
    // tslint:disable-next-line:readonly-keyword
    unregisterCallback: UnregisterCallback;

    static readonly getDerivedStateFromProps =
        (nextProps: HomeProductListProps, prevState: HomeProductListState) => {
            // * for init design param
            const designParam = prevState.fetchParams.find(param =>
                param.parameter === nameof<Product>(product => product.design)
            );
            const { selectedProductDesign } = nextProps;

            // * design has changed
            if (
                selectedProductDesign &&
                selectedProductDesign.id !== designParam.value
            ) {
                const defaultSearchParams = getDefaultSearchParams();
                const defaultDesignParams = defaultSearchParams.find(param =>
                    param.parameter === nameof<Product>(product => product.design)
                );
                defaultDesignParams.value = selectedProductDesign.id;

                return {
                    ...prevState,
                    fetchParams: [...defaultSearchParams],
                };
            }
            return null;
        }

    constructor(props: HomeProductListProps) {
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
        const prevFetchSortParam = fetchParams.find(o => o.parameter === '_sort');
        const prevFetchStartParam = fetchParams.find(o => o.parameter === '_start');

        const currentSearchParams = new URLSearchParams(location.search);
        const currentSearchSortParam = currentSearchParams.get('_sort');

        if (prevFetchSortParam.value === currentSearchSortParam) {
            return null;
        }

        prevFetchSortParam.value = currentSearchSortParam || undefined;
        prevFetchStartParam.value = 0;

        this.setState({
            fetchParams: [
                ...fetchParams
            ],
            fetchedProducts: [],
            prevFetchedProducts: [...this.state.fetchedProducts]
        });
    }

    readonly renderComponent = (renderProps: RestfulComponentRenderProps<Product[]>) => {
        const { fetchedProducts, prevFetchedProducts, fetchParams } = this.state;

        return (
            <React.Fragment>
                <HomeProductListController
                    products={fetchedProducts.length ?
                        fetchedProducts :
                        (prevFetchedProducts || [])
                    }
                />
                <HomeProductListViewMoreBtn
                    fetchParams={fetchParams}
                    loadedProducts={fetchedProducts.length}
                    fetching={renderProps.fetching}
                    onButtonClick={() => {
                        const start = fetchParams.find(o => o.parameter === '_start');
                        start.value = fetchedProducts.length;

                        this.setState({
                            fetchParams: [...fetchParams]
                        });
                    }}
                />
            </React.Fragment>
        );
    }

    render() {
        const { selectedProductType, selectedProductDesign } = this.props;

        if (!selectedProductType
            || !selectedProductDesign
        ) {
            return null;
        }

        const { fetchedProducts, fetchParams } = this.state;

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={productResources.find}
                parameters={fetchParams}
                onFetchCompleted={(data) => {
                    this.setState({
                        fetchedProducts: [
                            ...fetchedProducts,
                            ...data
                        ]
                    });
                }}
                render={this.renderComponent}
            />
        );
    }
}