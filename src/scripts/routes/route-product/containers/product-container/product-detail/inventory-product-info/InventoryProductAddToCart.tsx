import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { AddProductToCartControl } from '@/forms/add-product-to-cart';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    ProductDiscount,
    restfulFetcher,
    restfulStore
} from '@/restful';

export interface InventoryProductAddToCartProps extends
    Pick<CommonStoreProps, 'selectedProductType'> {
    readonly productDiscount: ProductDiscount;
}

@withStoreValues<InventoryProductAddToCartProps>('selectedProductType')
export class InventoryProductAddToCart extends React.PureComponent<InventoryProductAddToCartProps> {
    public render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return null;
        }

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'query',
                    parameter: nameof<DiscountByQuantity>(o => o.productType),
                    value: selectedProductType.id
                }]}
                resource={discountByQuantitiesResources.find}
                render={this.renderForm}
            />
        );
    }

    readonly renderForm = (renderProps) => {
        const { productDiscount } = this.props;

        if (!renderProps.data) {
            return null;
        }

        return (
            <AddProductToCartControl
                discountByQuantities={renderProps.data}
                productDiscount={productDiscount}
            />
        );
    }
}
