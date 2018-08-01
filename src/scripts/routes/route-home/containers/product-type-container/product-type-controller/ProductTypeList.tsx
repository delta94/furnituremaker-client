import * as React from 'react';
import styled from 'styled-components';

import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';
import Slider, { Settings } from 'react-slick';
import { withStoreValues } from '@/app';
import { Img } from '@/components';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 1px;
    z-index: 1;
`;

type ContentProps = React.ComponentType<React.DOMAttributes<{}> & { readonly showList: boolean }>;
const Content: ContentProps = styled.div`
    position: absolute;
    width: 100%;
    height: 220px;
    border-bottom: 2px solid #D59B01;
    background-color: #F6F5F6;
    transition: visibility 0s, opacity 0.3s;
    visibility : ${(props) => props.showList ? 'visible' : 'hidden'};
    opacity : ${(props) => props.showList ? 1 : 0};
`;

type ItemProps = React.ComponentType<React.DOMAttributes<{}> & { readonly isSelected: boolean }>;
const Item: ItemProps = styled.div`
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    opacity: ${(props) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.span`
    color: #3E3E3E;
    font-size: 14px;
`;

export interface ProductTypeListStoreProps {
    readonly showProductTypeList?: boolean;
}

interface ProductTypeListProps extends CommonStoreProps, ProductTypeListStoreProps {
    readonly productTypes: ProductType[];
    readonly onTypeClick: (type: ProductType) => void;
    readonly onMouseHoverOnList: () => void;
    readonly onMouseLeaveList: () => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<ProductTypeListProps>(o => o.showProductTypeList)
)
export class ProductTypeList extends React.Component<ProductTypeListProps> {
    static readonly defaultProps: ProductTypeListProps = {
        showProductTypeList: false,
        productTypes: [],
        onTypeClick: () => { /** onTypeClick */ },
        onMouseHoverOnList: () => { /** onTypeClick */ },
        onMouseLeaveList: () => { /** onTypeClick */ }
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    render() {
        const {
            productTypes,
            selectedProductType,
            onTypeClick,
            showProductTypeList,
            onMouseHoverOnList,
            onMouseLeaveList
        } = this.props;

        return (
            <Wrapper>
                <Content
                    showList={showProductTypeList}
                    onMouseEnter={onMouseHoverOnList}
                    onMouseLeave={onMouseLeaveList}
                >
                    <Slider {...ProductTypeList.slickSettings}>
                        {
                            productTypes.map((productType: ProductType) => {
                                return (
                                    <Item
                                        key={productType.id}
                                        isSelected={selectedProductType && selectedProductType.id === productType.id}
                                        onClick={() => onTypeClick(productType)}
                                    >
                                        <ThumbnailWrapper>
                                            <Img className="mw-100" file={productType.thumbnail} />
                                        </ThumbnailWrapper>
                                        <Label>{productType.name}</Label>
                                    </Item>
                                );
                            })
                        }
                    </Slider>
                </Content>
            </Wrapper>
        );
    }
}