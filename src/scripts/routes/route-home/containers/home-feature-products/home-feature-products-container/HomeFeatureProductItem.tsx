import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { colorPrimary } from '@/configs';
import { Product } from '@/restful';

const ItemWrapper = styled.div`
    background: #F9F9F9;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    padding: 40px 0;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        border-color: ${colorPrimary};
    }
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

export interface HomeFeatureProductItemProps {
    readonly product: Product;
}

export class HomeFeatureProductItem extends React.PureComponent<HomeFeatureProductItemProps> {
    public render() {
        const { product } = this.props;
        return (
            <ItemWrapper>
                <ItemContent>
                    <ItemThumbWapper>
                        <Img file={product.thumbnail} />
                    </ItemThumbWapper>
                    <ItemThumbTitle>
                        {product.name}
                    </ItemThumbTitle>
                </ItemContent>
            </ItemWrapper>
        );
    }
}
