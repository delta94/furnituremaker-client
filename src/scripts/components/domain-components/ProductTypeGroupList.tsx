import * as React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import { ProductTypeGroup, productTypeGroupUtils } from '@/restful';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { Img } from './generic';

interface ProductTypeGroupListProps extends CommonStoreProps {
    readonly productTypeGroups: ProductTypeGroup[];
}

@withStoreValues('selectedProductTypeGroup')
export class ProductTypeGroupList extends React.Component<ProductTypeGroupListProps> {
    static readonly defaultProps: ProductTypeGroupListProps = {
        productTypeGroups: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1
    };

    constructor(props: ProductTypeGroupListProps) {
        super(props);

        const { productTypeGroups, setStore } = props;

        // * Set default product type group
        const defaulTypeGroup = productTypeGroupUtils.getDefaultProductTypeGroup(productTypeGroups);
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedProductTypeGroup)]: defaulTypeGroup
        })
    }

    render() {
        const { selectedProductTypeGroup, setStore } = this.props;

        return (
            <Wrapper itemLength={this.props.productTypeGroups.length}>
                <Slider {...ProductTypeGroupList.slickSettings}>
                    {
                        this.props.productTypeGroups.map(productTypeGroup => {
                            const onItemClick = () => {
                                if (selectedProductTypeGroup &&
                                    selectedProductTypeGroup.id === productTypeGroup.id) {
                                    return;
                                }

                                setStore({
                                    [nameof<CommonStoreProps>(o => o.selectedProductTypeGroup)]: productTypeGroup,
                                    [nameof<CommonStoreProps>(o => o.selectedProductType)]: null,
                                    [nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)]: null,
                                    [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: null
                                });
                            };

                            return (
                                <Item
                                    key={productTypeGroup.id}
                                    isSelected={selectedProductTypeGroup ?
                                        selectedProductTypeGroup.id === productTypeGroup.id : undefined}
                                    onClick={onItemClick}
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
