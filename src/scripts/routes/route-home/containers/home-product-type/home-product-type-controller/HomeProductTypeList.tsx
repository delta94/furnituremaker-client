import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container, Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    .slick-track {
        > .slick-slide {
            padding-right: 4px;
        }
    }
`;

interface ContentProps extends React.DOMAttributes<HTMLDivElement> {
    readonly showList: boolean;
}

const Content: React.ComponentType<ContentProps> = styled.div`
    position: absolute;
    width: 100%;
    height: 230px;
    background: #fff;
    transition: visibility 0s, opacity 0.3s;
    visibility : ${(props: ContentProps) => props.showList ? 'visible' : 'hidden'};
    opacity : ${(props) => props.showList ? 1 : 0};
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}
const Item: React.ComponentType<ItemProps> = styled.div`
    text-align: center;
    transition: all .3s;
    background: #FFC12E;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 1};
    cursor: pointer;
    height: 220px;

`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

export interface HomeProductTypeListStoreProps {
    readonly showHomeProductTypeList?: boolean;
}

interface HomeProductTypeListProps extends CommonStoreProps, HomeProductTypeListStoreProps {
    readonly productTypes: ProductType[];
    readonly onTypeClick: (type: ProductType) => void;
    readonly onMouseHoverOnList: () => void;
    readonly onMouseLeaveList: () => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<HomeProductTypeListProps>(o => o.showHomeProductTypeList)
)
export class HomeProductTypeList extends React.Component<HomeProductTypeListProps> {
    static readonly defaultProps: Partial<HomeProductTypeListProps> = {
        showHomeProductTypeList: false,
        productTypes: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    render() {
        const {
            productTypes,
            selectedProductType,
            onTypeClick,
            showHomeProductTypeList,
            onMouseHoverOnList,
            onMouseLeaveList
        } = this.props;

        return (
            <Container>
                <Wrapper>
                    <Content
                        showList={showHomeProductTypeList}
                        onMouseEnter={onMouseHoverOnList}
                        onMouseLeave={onMouseLeaveList}
                    >
                        <Slider {...HomeProductTypeList.slickSettings}>
                            {
                                productTypes.map((productType: ProductType) => {
                                    return (
                                        <Item
                                            key={productType.id}
                                            isSelected={selectedProductType &&
                                                selectedProductType.id === productType.id}
                                            onClick={() => onTypeClick(productType)}
                                        >
                                            <ThumbnailWrapper>
                                                <Img className="mw-100 w-100" file={productType.thumbnail} />
                                            </ThumbnailWrapper>
                                            <Label>{productType.name}</Label>
                                        </Item>
                                    );
                                })
                            }
                        </Slider>
                    </Content>
                </Wrapper>
            </Container>
        );
    }
}