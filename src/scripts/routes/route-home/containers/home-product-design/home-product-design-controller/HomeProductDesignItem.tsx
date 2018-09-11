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
    restfulFetcher,
    restfulStore
} from '@/restful';

const ItemSquare = styled.div`
    position: relative;
`;

const ItemRectangle = styled.div`
    position: relative;
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}

const ThumbnailWrapper: React.ComponentType<ItemProps> = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin: 0 10px;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
    transition: all .3s;
    &:hover {
        opacity: 1;
    }
`;

const Label = styled.span`
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 15px;
    right: 25px;
    line-height: normal;
    text-transform: uppercase;
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
        const ItemWrapper = productDesign.coverPhotoShape === 'rectangle' ? ItemRectangle : ItemSquare;
        const isSelected = selectedProductDesign && (
            selectedProductDesign.id === productDesign.id
        );

        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
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
                                        className="mw-100 w-100"
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