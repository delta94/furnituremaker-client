import * as React from 'react';
import {
    ResourceParameter,
    RestfulRender,
    RestfulRenderProps
} from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import {
    Product,
    productResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import {
    HomeProductListController,
    HomeProductListViewMoreBtn
} from './home-product-list';

interface HomeProductListProps extends
    Pick<CommonStoreProps, 'selectedProductType'> {
}

interface HomeProductListState {
    readonly fetchedProducts: Product[];
    readonly fetchParams: ResourceParameter[];
}

@withStoreValues<HomeProductListProps>('selectedProductType')
export class HomeProductList extends React.PureComponent<HomeProductListProps, HomeProductListState> {
    static readonly defaultFetchParams = [{
        type: 'query',
        parameter: `${nameof<Product>(o => o.isFeatureProduct)}_ne`,
        value: true
    } as ResourceParameter, {
        type: 'query',
        parameter: '_limit',
        value: 4
    } as ResourceParameter
    ];

    readonly state = {
        fetchedProducts: [],
        fetchParams: HomeProductList.defaultFetchParams
    };

    readonly renderComponent = (renderProps: RestfulRenderProps<Product>) => {
        const { fetchedProducts } = this.state;

        return (
            <React.Fragment>
                <HomeProductListController
                    products={fetchedProducts}
                />
                <HomeProductListViewMoreBtn
                    fetching={renderProps.fetching}
                    onButtonClick={() => {
                        this.setState({
                            fetchParams: [
                                ...HomeProductList.defaultFetchParams,
                                {
                                    type: 'query',
                                    parameter: '_start',
                                    value: fetchedProducts.length
                                }
                            ]
                        });
                    }}
                />
            </React.Fragment>
        );
    }

    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        const { fetchedProducts, fetchParams } = this.state;

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
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