import * as React from 'react';

import { AntdList, Container } from '@/components';
import { Product } from '@/restful';

import { HomeProductListItem } from './home-product-list-controller';

export interface HomeProductListControllerProps {
    readonly products: Product[];
}

export class HomeProductListController extends React.PureComponent<HomeProductListControllerProps> {
    public render() {
        const { products } = this.props;
        return (
            <Container>
                <AntdList
                    grid={{ gutter: 20, column: 4 }}
                    dataSource={products}
                    renderItem={product => (
                        <AntdList.Item key={product.id}>
                            <HomeProductListItem
                                product={product}
                            />
                        </AntdList.Item>
                    )}
                />
            </Container>
        );
    }
}
