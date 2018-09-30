import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container, Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup } from '@/restful';

const Wrapper = styled.div`
    margin: 0 auto;
    padding-top: 15px;
    width: 100%;
    .slick-slider {
        margin: 0 0px;
    }
    .slick-slide {
        padding-right: 4px;
    }
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
    readonly canClick: boolean;
}

type ItemType = React.ComponentType<ItemProps>;

const Item: ItemType = styled.div`
    text-align: center;
    cursor: ${(props: ItemProps) => props.canClick && 'pointer'};
    height:  165px; 
    flex-direction: column;
    position: relative;
    transition: all .2s;
    background: #fff;
`;

const ItemContent: ItemType = styled.div`
    display: flex!important;
    justify-content: center;
    align-items: center;
    height: ${(props: ItemProps) => props.isSelected ? '165px' : '150px'};
    border: ${(props: ItemProps) => props.isSelected ? '3px solid #FFC12E' : '1px solid #E9E9E9'};
    border-bottom-width: ${(props: ItemProps) => props.isSelected ? '15px' : '1px'};
    padding: ${(props: ItemProps) => props.isSelected ? '0' : '3px'};
    transition: all .2s ease-in;
    &:hover {
        height: 165px;
        border: 3px solid #FFC12E;
        border-bottom-width: 15px;
    }
`;

const ThumbnailWrapper = styled.div`
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        max-width: 90%!important;
        transition: all .2s;
    }
`;

const Label = styled.span`
    font-size: 14px;
    display: block;
    margin: 0 0 5px 0;
    position: absolute;
    bottom: 15px;
    transition: all .2s;
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
        slidesToShow: 8,
        slidesToScroll: 1
    };

    render() {
        const {
            hoveredProductTypeGroup,
            selectedProductTypeGroup,
            onProductTypeGroupHover,
            onProductTypeGroupLeave,
            onProductTypeGroupClick,
            productTypeGroups
        } = this.props;

        const newProductTypeGroups = [...productTypeGroups];
        newProductTypeGroups.splice(1, 0, {
            id: 'wtf?',
            name: 'Khuyến mãi',
            productTypes: [],
            thumbnail: {
                url: '/static/assets/khuyen-mai.png'
            }
        });

        return (
            <Container>
                <Wrapper>
                    <Slider {...HomeProductTypeGroupList.slickSettings}>
                        {
                            newProductTypeGroups
                                .map(productTypeGroup => {
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
                                            <ItemContent isSelected={isSelected} canClick={false}>
                                                <ThumbnailWrapper>
                                                    <Img file={productTypeGroup.thumbnail} />
                                                </ThumbnailWrapper>
                                                <Label>{productTypeGroup.name}</Label>
                                            </ItemContent>
                                        </Item>
                                    );
                                })
                        }
                    </Slider>
                </Wrapper>
            </Container>
        );
    }
}