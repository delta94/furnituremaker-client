import * as React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import { ProductTypeGroup } from '@/restful';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

interface ProductTypeGroupListProps extends CommonStoreProps {
    productTypeGroups: ProductTypeGroup[];
}

@withStoreValues('selectedProductTypeGroup')
export class ProductTypeGroupList extends React.Component<ProductTypeGroupListProps> {
    static defaultProps: ProductTypeGroupListProps = {
        productTypeGroups: []
    };

    static slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1
    };

    render() {
        const { selectedProductTypeGroup, setStore } = this.props;
        return (
            <Wrapper itemLength={this.props.productTypeGroups.length}>
                <Slider {...ProductTypeGroupList.slickSettings}>
                    {
                        this.props.productTypeGroups.map(productTypeGroup => {
                            const onItemClick = () => {
                                if (selectedProductTypeGroup === productTypeGroup.id) {
                                    return;
                                }
                                
                                setStore({
                                    [nameof<CommonStoreProps>(o => o.selectedProductTypeGroup)]: productTypeGroup.id,
                                    [nameof<CommonStoreProps>(o => o.selectedProductType)]: null,
                                    [nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)]: null,
                                    [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: null
                                });
                            };

                            return (
                                <Item
                                    key={productTypeGroup.id}
                                    isSelected={selectedProductTypeGroup === productTypeGroup.id}
                                    onClick={onItemClick}
                                >
                                    <ThumbnailWrapper>
                                        <img src={productTypeGroup.thumbnail.url} />
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

type WrapperProps = React.ComponentType<React.DOMAttributes<{}> & { itemLength: number }>;
const Wrapper: WrapperProps = styled.div`
    background-color: #fff;
    margin: 0 auto;
`;

type ItemProps = React.ComponentType<React.DOMAttributes<{}> & { isSelected: boolean }>;
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
