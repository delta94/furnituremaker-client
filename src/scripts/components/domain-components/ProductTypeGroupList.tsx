import * as React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import { ProductTypeGroup } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';

interface ProductTypeGroupListProps extends WithStoreValuesProps {
    productTypeGroups: ProductTypeGroup[];
    selectedProductTypeGroup?: string;
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
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: true,
    };

    render() {
        const { selectedProductTypeGroup, setStore } = this.props;
        return (
            <Wrapper>
                <Slider {...ProductTypeGroupList.slickSettings}>
                    {
                        this.props.productTypeGroups.map(productTypeGroup => {
                            return (
                                <Item
                                    key={productTypeGroup.id}
                                    isSelected={selectedProductTypeGroup === productTypeGroup.id}
                                    onClick={() => setStore({ selectedProductTypeGroup: productTypeGroup.id })}
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

const Wrapper = styled.div`
    cursor: pointer;
`;

type ItemProps = React.ComponentType<React.DOMAttributes<{}> & { isSelected: boolean }>;
const Item: ItemProps = styled.div`
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    background-color: ${(props) => props.isSelected && '#F6F5F6'};
`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.span`
    font-weight: bold;
`;
