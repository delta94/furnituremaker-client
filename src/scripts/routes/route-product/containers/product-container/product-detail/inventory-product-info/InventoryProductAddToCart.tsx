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
        const { selectedProductType, productDiscount } = this.props;
        if (!selectedProductType) {
            return null;
        }

        return (
            <div>
                <h4>Thêm vào giỏ hàng</h4>
                <RestfulRender
                    fetcher={restfulFetcher}
                    store={restfulStore}
                    parameters={[{
                        type: 'query',
                        parameter: nameof<DiscountByQuantity>(o => o.productType),
                        value: selectedProductType.id
                    }]}
                    resource={discountByQuantitiesResources.find}
                    render={(renderProps) => {
                        if (renderProps.data && !renderProps.fetching) {
                            return (
                                <AddProductToCartControl
                                    discountByQuantities={renderProps.data}
                                    productDiscount={productDiscount}
                                />
                            );
                        }
                        return null;
                    }}
                />
            </div>
        );
    }
}
