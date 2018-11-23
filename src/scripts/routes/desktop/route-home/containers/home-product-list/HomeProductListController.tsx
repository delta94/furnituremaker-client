import * as React from 'react';

import { AntdCol, AntdRow, Container, Img } from '@/components';
import { Product, WithProductDiscounts, withProductDiscounts } from '@/restful';

import { HomeProductListItem } from './home-product-list-controller';

export interface HomeProductListControllerProps extends WithProductDiscounts {
    readonly products: Product[];
}

@withProductDiscounts()
export class HomeProductListController extends React.PureComponent<HomeProductListControllerProps> {
    public render() {
        const { products, productDiscounts } = this.props;
        const firstTwo = products.filter((o, index) => index <= 1);
        return (
            <Container>
                <AntdRow gutter={4} type="flex">
                    {
                        firstTwo.map(this.renderProductItem)
                    }
                    <AntdCol span={12}>
                        <div>
                            <Img className="mw-100 w-100" file="/static/assets/home-decor.png" />
                        </div>
                    </AntdCol>
                    {
                        products.map((product, index) => {
                            if (index <= 1) {
                                return null;
                            }
                            return this.renderProductItem(product, index);
                        })
                    }
                </AntdRow>
            </Container>
        );
    }

    readonly renderProductItem = (product, index) => {
        const { productDiscounts } = this.props;

        return (
            <AntdCol key={product.id} span={6}>
                <HomeProductListItem
                    productDiscounts={productDiscounts}
                    product={product}
                />
            </AntdCol>
        );
    }
}
