import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    Product,
    ProductDesign,
    productResources,
    restfulFetcher
} from '@/restful';

const ItemSquare = styled.div`
    position: relative;
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}

const ThumbnailWrapper: React.ComponentType<ItemProps> = styled.div`
    overflow: hidden;
    margin: 0 0px;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
    transition: all .3s;
    height: 220px;
    background: #4B4B4B;
    &:hover {
        opacity: 1;
    }
`;

const Label = styled.span`
    color: #fff;
    font-size: 18px;
    position: absolute;
    top: 15px;
    right: 25px;
    line-height: 1;
    text-transform: uppercase;
    text-align: right;
    small {
        font-size: 14px;
        text-transform: lowercase;
    }
`;

interface HomeProductDesignItemProps extends
    Pick<CommonStoreProps, 'selectedProductDesign'>,
    Pick<CommonStoreProps, 'setStore'> {
    readonly productDesign: ProductDesign;
}

@withStoreValues<HomeProductDesignItemProps>(
    'setStore',
    'selectedProductDesign'
)
export class HomeProductDesignItem extends React.PureComponent<HomeProductDesignItemProps> {
    render() {
        const { productDesign, selectedProductDesign, setStore } = this.props;
        const ItemWrapper = ItemSquare;
        const isSelected = selectedProductDesign && (
            selectedProductDesign.id === productDesign.id
        );

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={productResources.count}
                parameters={[{
                    type: 'query',
                    parameter: nameof<Product>(o => o.design),
                    value: productDesign.id
                }]}
                render={(renderProps) => {
                    if (!renderProps.data) {
                        return null;
                    }

                    return (
                        <ItemWrapper
                            onClick={() => {
                                setStore<HomeProductDesignItemProps>({
                                    selectedProductDesign: productDesign
                                });
                            }}
                        >
                            <Link to={`?design=${productDesign.id}`}>
                                <ThumbnailWrapper isSelected={isSelected}>
                                    <Img
                                        className="h-100"
                                        file={productDesign.coverPhoto}
                                    />
                                </ThumbnailWrapper>
                                <Label>
                                    {productDesign.title || productDesign.name}
                                    <br />
                                    <small>{renderProps.data} sản phẩm</small>
                                </Label>
                            </Link>
                        </ItemWrapper>
                    );
                }}
            />
        );
    }
}