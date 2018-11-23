import * as React from 'react';

import { AntdList, Container } from '@/components';
import { Product } from '@/restful';

import { HomeFeatureProductItem } from './home-feature-products-container';

export interface HomeFeatureProductsControllerProps {
    readonly products: Product[];
}

export class HomeFeatureProductsController extends React.PureComponent<HomeFeatureProductsControllerProps> {
    public render() {
        const { products } = this.props;
        return (
            <Container>
                <AntdList
                    grid={{ gutter: 20, column: 2 }}
                    dataSource={products}
                    renderItem={product => (
                        <AntdList.Item key={product.id}>
                            <HomeFeatureProductItem
                                product={product}
                            />
                        </AntdList.Item>
                    )}
                />
            </Container>
        );
    }
}
