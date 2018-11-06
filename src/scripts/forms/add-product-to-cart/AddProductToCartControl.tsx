import * as React from 'react';

import { Auth, withStoreValues } from '@/app';
import { AntdMessage, fetchErrorHandler } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    DiscountByQuantity,
    OrderDetail,
    orderDetailResources,
    orderDetailUtils,
    ProductDiscount,
    productUtils,
    restfulFetcher,
    WithTempOrderDetails,
    withTempOrderDetails
} from '@/restful';

import {
    AddProductToCartForm,
    AddToCartFormValues
} from './add-product-cart-control';

interface ProductAddCartControlProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProduct'>,
    Pick<CommonStoreProps, 'product3Dsence'>,
    WithTempOrderDetails {
    readonly discountByQuantities: DiscountByQuantity[];
    readonly productDiscount?: ProductDiscount;
}

@withTempOrderDetails
@withStoreValues<CommonStoreProps>('selectedProduct', 'product3Dsence')
export class AddProductToCartControl extends React.PureComponent<ProductAddCartControlProps> {
    readonly createNewOrderDetail = async (quantity: number): Promise<OrderDetail> => {
        const {
            selectedProduct,
            discountByQuantities,
            product3Dsence,
            productDiscount
        } = this.props;

        const productPrice = productUtils.getOriginPrice(selectedProduct);

        const discountPerProduct = productUtils.getDiscount(
            selectedProduct,
            quantity,
            discountByQuantities,
            productDiscount
        );

        const subTotalPrice = productPrice * quantity;
        const totalPrice = subTotalPrice - (discountPerProduct * quantity);

        const previewImg = selectedProduct.thumbnail ?
            selectedProduct.thumbnail.url :
            await product3Dsence.takeScreenshot();

        return {
            design: selectedProduct.design.id,
            producttype: selectedProduct.productType,
            productModulesCode: productUtils.getProductModulesCode(selectedProduct),
            quantity: quantity,
            subTotalPrice: subTotalPrice,
            totalPrice: totalPrice,
            productPrice: productPrice,
            discountMoneyByInventoryProduct: productDiscount && productDiscount.discountMoney,
            discountPercentByInventoryProduct: productDiscount && productDiscount.discountPercent,
            totalDiscountPerProduct: discountPerProduct,
            discount: discountPerProduct * quantity,
            status: 'temp',
            previewImg: previewImg,
            createdBy: Auth.instance.currentUser,
            productCode: selectedProduct.produceCode
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
        const { discountByQuantities, productDiscount, selectedProduct } = this.props;

        try {
            const { orderDetail, selectQuantity, } = values;
            const nextQuantity = orderDetail.quantity + (+selectQuantity);

            const nextDiscoutPerProduct = productUtils.getDiscount(
                selectedProduct,
                nextQuantity,
                discountByQuantities,
                productDiscount
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
            orderDetails,
            productDiscount
        } = this.props;

        const discount = discountByQuantities[0];
        const initQuantity = discount ? discount.quantity : 1;

        const selectedProductModulesCode = productUtils.getProductModulesCode(selectedProduct);
        const existingOrderDetail = orderDetails.find(o => o.productModulesCode === selectedProductModulesCode);

        return (
            <AddProductToCartForm
                product={selectedProduct}
                productDiscount={productDiscount}
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
                onSubmitSuccess={() => {
                    const { setStore } = this.props;
                    AntdMessage.success('Sản phẩm đã được thêm vào giỏ');
                    setStore<CommonStoreProps>({
                        drawerVisible: true
                    });
                }}
            />
        );
    }
}