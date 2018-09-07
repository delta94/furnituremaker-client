import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { Product } from '@/restful';

const ItemWrapper = styled.div`
    background: #F9F9F9;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    padding: 15px 0;
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

export interface HomeProductListItemProps {
    readonly product: Product;
}

export class HomeProductListItem extends React.PureComponent<HomeProductListItemProps> {
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
