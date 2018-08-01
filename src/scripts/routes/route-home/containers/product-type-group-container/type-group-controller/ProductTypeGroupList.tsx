import * as React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import { ProductTypeGroup, productTypeGroupUtils } from '@/restful';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { Img } from '@/components';

type WrapperProps = React.ComponentType<React.DOMAttributes<{}> & { readonly itemLength: number }>;
const Wrapper: WrapperProps = styled.div`
    background-color: #fff;
    margin: 0 auto;
`;

type ItemProps = React.ComponentType<React.DOMAttributes<{}> & { readonly isSelected: boolean }>;
const Item: ItemProps = styled.div`
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    cursor: pointer;
    background-color: ${(props) => props.isSelected && '#F6F5F6'};
`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.span`
    font-size: 14px;
`;

interface ProductTypeGroupListProps extends CommonStoreProps {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly onProductTypeGroupClick: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupHover: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupLeave: () => void;
}

@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProductTypeGroup))
export class ProductTypeGroupList extends React.Component<ProductTypeGroupListProps> {
    static readonly defaultProps: ProductTypeGroupListProps = {
        productTypeGroups: [],
        onProductTypeGroupClick: () => { /** onProductTypeGroupHover */ },
        onProductTypeGroupHover: () => { /** onProductTypeGroupHover */ },
        onProductTypeGroupLeave: () => { /** onProductTypeGroupHover */ }
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
            selectedProductTypeGroup,
            onProductTypeGroupHover,
            onProductTypeGroupLeave,
            onProductTypeGroupClick
        } = this.props;

        return (
            <Wrapper itemLength={this.props.productTypeGroups.length}>
                <Slider {...ProductTypeGroupList.slickSettings}>
                    {
                        this.props.productTypeGroups.map(productTypeGroup => {
                            return (
                                <Item
                                    key={productTypeGroup.id}
                                    isSelected={selectedProductTypeGroup ?
                                        selectedProductTypeGroup.id === productTypeGroup.id : undefined}
                                    onClick={() => onProductTypeGroupClick(productTypeGroup)}
                                    onMouseOver={() => onProductTypeGroupHover(productTypeGroup)}
                                    onMouseLeave={onProductTypeGroupLeave}
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