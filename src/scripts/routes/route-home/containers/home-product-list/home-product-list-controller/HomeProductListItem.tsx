import * as React from 'react';
import styled from 'styled-components';

import { AntdButton, Img } from '@/components';
import { colorPrimary } from '@/configs';
import {
    Product,
    productDiscountUtils,
    restfulStore,
    withProductDiscounts,
    WithProductDiscounts
} from '@/restful';
import { formatCurrency } from '@/utilities';

const ItemWrapper = styled.div`
    background: #F9F9F9;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    padding: 15px 0;
    transition: all .3s;
    position: relative;
    margin: 0 0 20px 0;
    &:hover {
        border-color: ${colorPrimary};
        > .item-info {
            visibility: unset;
            opacity: 1;
        }
    }
`;

const ItemDiscount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/static/assets/sale.png');
    background-size: 100%;
    position: absolute;
    padding: 5px 20px 5px 5px;
    color: #fff;
`;

const ItemContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ItemThumbWapper = styled.div`
    max-width: 200px;
    margin: 0 0 10px 0;
    img {
        max-width: 100%;
        width: 100%;
    }
`;

const ItemThumbTitle = styled.label`
    color: #9B9B9B;
`;

const ItemInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .9);
    visibility: hidden;
    opacity: 0;
    transition: all .3s;
`;

const ItemInfoName = styled.label`
    line-height: 1;
    font-size: 20px;
    text-align: center;
    color: #4A4A4A;
    font-weight: bold;
    display: bold;
    padding: 0 0 15px 0;
    margin: 0 0 15px 0;
    border-bottom: 1px solid;
`;

const ItemInfoPrice = styled.span`
    line-height: 1;
    font-size: 26px;
    text-align: center;
    color: #536AB1;
    font-weight: bold;
    margin: 0 0 30px 0;
    display: block;
    small {
        font-size: 16px;
        color: #4A4A4A;
    }
`;

const ItemInfoActions = styled.div`
    text-align: center;
`;

export interface HomeProductListItemProps
    extends WithProductDiscounts {
    readonly product: Product;
}

@withProductDiscounts(restfulStore)
export class HomeProductListItem extends React.PureComponent<HomeProductListItemProps> {
    public render() {
        const { product, productDiscounts } = this.props;

        const productDiscount =
            productDiscountUtils.getDiscountByProduct(productDiscounts, product);

        return (
            <ItemWrapper>
                {
                    productDiscount && (
                        <ItemDiscount>
                            Giảm ngay {
                                productDiscount.discountMoney ?
                                    formatCurrency(productDiscount.discountMoney) :
                                    `${productDiscount.discountPercent} %`
                            }
                        </ItemDiscount>
                    )
                }
                <ItemContent>
                    <ItemThumbWapper>
                        <Img file={product.thumbnail} />
                    </ItemThumbWapper>
                    <ItemThumbTitle>
                        {product.name}
                    </ItemThumbTitle>
                </ItemContent>
                <ItemInfo className="item-info">
                    <ItemInfoName>
                        {product.name}
                        <br />
                        <small>{product.produceCode}</small>
                    </ItemInfoName>
                    <ItemInfoPrice >
                        {formatCurrency(product.totalPrice)} đ
                        <br />
                        <small>còn {product.inventory} sản phẩm</small>
                    </ItemInfoPrice>
                    <ItemInfoActions>
                        <AntdButton
                            href={`/product/${product.id}`}
                        >
                            Mua hàng
                        </AntdButton>
                    </ItemInfoActions>
                </ItemInfo>
            </ItemWrapper>
        );
    }
}