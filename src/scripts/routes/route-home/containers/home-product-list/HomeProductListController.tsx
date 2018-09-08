import * as React from 'react';

import { AntdCol, AntdRow, Container } from '@/components';
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
                <AntdRow gutter={20} type="flex">
                    {
                        products.map(product => {
                            return (
                                <AntdCol key={product.id} span={6}>
                                    <HomeProductListItem product={product}/>
                                </AntdCol>
                            );
                        })
                    }
                </AntdRow>
            </Container>
        );
    }
}
