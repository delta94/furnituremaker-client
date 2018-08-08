import * as React from 'react';

import {
    DiscountByQuantity,
    productUtils,
    discountByQuantitiesUtils,
    OrderDetail,
    resfulFetcher,
    orderDetailResources,
    WithTempOrderDetails,
    withTempOrderDetails,
    restfulStore,
    orderDetailUtils
} from '@/restful';

import { CommonStoreValues, CommonStoreProps } from '@/configs';
import { fetchErrorHandler } from '@/components';
import { withStoreValues } from '@/app';

import { AddProductToCartForm, AddToCartFormValues } from './add-product-cart-control';

interface ProductAddCartControlProps extends CommonStoreValues, WithTempOrderDetails {
    readonly discountByQuantities: DiscountByQuantity[];
}

@withTempOrderDetails(restfulStore)
@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProduct))
export class AddProductToCartControl extends React.PureComponent<ProductAddCartControlProps> {
    readonly createNewOrderDetail = (quantity: number): OrderDetail => {
        const { selectedProduct, discountByQuantities } = this.props;
        const productPrice = productUtils.getOriginPrice(selectedProduct);
        const discountPerProduct = discountByQuantitiesUtils.getDiscountValue(
            discountByQuantities,
            quantity
        );
        const subTotalPrice = productPrice * quantity;
        const totalPrice = subTotalPrice - (discountPerProduct * quantity);

        return {
            design: selectedProduct.design,
            productType: selectedProduct.productType,
            productCode: productUtils.getProductCode(selectedProduct),
            quantity: quantity,
            subTotalPrice: subTotalPrice,
            totalPrice: totalPrice,
            productPrice: productPrice,
            productDiscount: discountPerProduct,
            discount: discountPerProduct * quantity,
            status: 'temp'
        };
    }

    readonly onCreateOrderDetail = async (values: AddToCartFormValues) => {
        try {
            const newOrderDetail = this.createNewOrderDetail(values.selectQuantity);
            await resfulFetcher.fetchResource(orderDetailResources.add, [{
                type: 'body',
                value: newOrderDetail
            }]);
        } catch (response) {
            throw await fetchErrorHandler(response);
        }
    }

    readonly onUpdateOrderDetail = async (values: AddToCartFormValues) => {
        const { discountByQuantities } = this.props;

        try {
            const { orderDetail, selectQuantity } = values;
            const nextQuantity = orderDetail.quantity + selectQuantity;
            const nextDiscoutPerProduct = discountByQuantitiesUtils.getDiscountValue(
                discountByQuantities,
                nextQuantity
            );
            const updateOrderDetail = orderDetailUtils.updateTheOrderDetail(
                orderDetail,
                nextQuantity,
                nextDiscoutPerProduct
            );

            await resfulFetcher.fetchResource(orderDetailResources.update, [{
                type: 'path',
                parameter: 'id',
                value: orderDetail.id
            }, {
                type: 'body',
                value: updateOrderDetail
            }]);
        } catch (response) {
            throw await fetchErrorHandler(response);
        }
    }

    render() {
        const {
            selectedProduct,
            discountByQuantities,
            orderDetails
        } = this.props;
        const discount = discountByQuantities[0];
        const initQuantity = discount ? discount.quantity : 1;

        const selectedProductCode = productUtils.getProductCode(selectedProduct);
        const existingOrderDetail = orderDetails.find(o => o.productCode === selectedProductCode);

        return (
            <AddProductToCartForm
                product={selectedProduct}
                discountByQuantities={discountByQuantities}
                initialValues={{
                    orderDetail: existingOrderDetail,
                    selectQuantity: initQuantity
                }}
                onSubmit={
                    existingOrderDetail ?
                        this.onUpdateOrderDetail :
                        this.onCreateOrderDetail
                }
            />
        );
    }
}