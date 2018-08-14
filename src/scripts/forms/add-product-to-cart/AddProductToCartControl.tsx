import * as React from 'react';

import { withStoreValues } from '@/app';
import { fetchErrorHandler } from '@/components';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    discountByQuantitiesUtils,
    DiscountByQuantity,
    OrderDetail,
    orderDetailResources,
    orderDetailUtils,
    productUtils,
    restfulFetcher,
    restfulStore,
    WithTempOrderDetails,
    withTempOrderDetails
} from '@/restful';

import {
    AddProductToCartForm,
    AddToCartFormValues
} from './add-product-cart-control';

interface ProductAddCartControlProps extends CommonStoreValues, WithTempOrderDetails {
    readonly discountByQuantities: DiscountByQuantity[];
}

@withTempOrderDetails(restfulStore)
@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProduct),
    nameof<CommonStoreProps>(o => o.product3Dsence)
)
export class AddProductToCartControl extends React.PureComponent<ProductAddCartControlProps> {
    readonly createNewOrderDetail = async (quantity: number): Promise<OrderDetail> => {
        const { selectedProduct, discountByQuantities, product3Dsence } = this.props;
        const productPrice = productUtils.getOriginPrice(selectedProduct);
        const discountPerProduct = discountByQuantitiesUtils.getDiscountValue(
            discountByQuantities,
            quantity
        );
        const subTotalPrice = productPrice * quantity;
        const totalPrice = subTotalPrice - (discountPerProduct * quantity);
        const previewImg = await product3Dsence.takeScreenshot();

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
            status: 'temp',
            previewImg: previewImg
        };
    }

    readonly onCreateOrderDetail = async (values: AddToCartFormValues) => {
        try {
            const newOrderDetail = await this.createNewOrderDetail(values.selectQuantity);
            await restfulFetcher.fetchResource(orderDetailResources.add, [{
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
            const nextQuantity = orderDetail.quantity + (+selectQuantity);
            const nextDiscoutPerProduct = discountByQuantitiesUtils.getDiscountValue(
                discountByQuantities,
                nextQuantity
            );
            const updateOrderDetail = orderDetailUtils.updateTheOrderDetail(
                orderDetail,
                nextQuantity,
                nextDiscoutPerProduct
            );
            const updateParams = orderDetailUtils.createUpdateParams(updateOrderDetail);
            await restfulFetcher.fetchResource(orderDetailResources.update, updateParams);
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
                    selectQuantity: initQuantity,
                    quantityWithDiscount: initQuantity
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