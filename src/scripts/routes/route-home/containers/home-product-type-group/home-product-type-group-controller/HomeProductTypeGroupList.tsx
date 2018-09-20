import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup } from '@/restful';

const Wrapper = styled.div`
    background-color: #fff;
    margin: 0 auto;
    padding-top: 30px;
    width: 100%;
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
    readonly canClick: boolean;
}

type ItemType = React.ComponentType<ItemProps>;
const Item: ItemType = styled.div`
    text-align: center;
    transition: all .3s;
    cursor: ${(props) => props.canClick && 'pointer'};
    background-color: ${(props: ItemProps) => props.isSelected && '#F6F5F6'};
    height: 150px;
    width: 150px!important;
    display: flex!important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.span`
    font-size: 14px;
    display: block;
    margin: 0 0 5px 0;
`;

interface HomeProductTypeGroupListProps extends
    Pick<CommonStoreProps, 'selectedProductTypeGroup'>,
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'> {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly onProductTypeGroupClick: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupHover: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupLeave: () => void;
}

@withStoreValues<HomeProductTypeGroupListProps>(
    'hoveredProductTypeGroup',
    'selectedProductTypeGroup'
)
export class HomeProductTypeGroupList extends React.Component<HomeProductTypeGroupListProps> {
    static readonly defaultProps: Partial<HomeProductTypeGroupListProps> = {
        productTypeGroups: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1
    };

    render() {
        const {
            hoveredProductTypeGroup,
            selectedProductTypeGroup,
            onProductTypeGroupHover,
            onProductTypeGroupLeave,
            onProductTypeGroupClick
        } = this.props;

        return (
            <Wrapper>
                <Slider {...HomeProductTypeGroupList.slickSettings}>
                    {
                        this.props.productTypeGroups.map(productTypeGroup => {
                            const isSelected = hoveredProductTypeGroup ?
                                hoveredProductTypeGroup.id === productTypeGroup.id :
                                (
                                    selectedProductTypeGroup &&
                                    selectedProductTypeGroup.id === productTypeGroup.id
                                );

                            const canClick = (
                                productTypeGroup &&
                                productTypeGroup.productTypes
                            ) && productTypeGroup.productTypes.length === 1;

                            return (
                                <Item
                                    key={productTypeGroup.id}
                                    isSelected={isSelected}
                                    canClick={canClick}
                                    onClick={() => onProductTypeGroupClick(productTypeGroup)}
                                    onMouseOver={() => {
                                        onProductTypeGroupHover(productTypeGroup);

                                    }}
                                    onMouseLeave={() => {
                                        onProductTypeGroupLeave();
                                    }}
                                >
                                    <ThumbnailWrapper>
                                        <Img file={productTypeGroup.thumbnail} />
                                    </ThumbnailWrapper>
                                    <Label>{productTypeGroup.name}</Label>
                                </Item>
                            );
                        })
                    }
                </Slider>
            </Wrapper>
        );
    }
}