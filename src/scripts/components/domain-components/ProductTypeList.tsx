import * as React from 'react';
import styled from 'styled-components';
import { CommonStoreProps } from '@/configs';
import { RestfulComponentRenderProps } from 'react-restful';
import { ProductType } from '@/restful';
import Slider, { Settings } from 'react-slick';
import { withStoreValues } from '@/app';

interface ProductTypeListProps extends
    CommonStoreProps,
    RestfulComponentRenderProps<ProductType[]> {
}

@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProductType))
export class ProductTypeList extends React.Component<ProductTypeListProps> {
    static slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    render() {
        const { data, selectedProductType, setStore } = this.props;

        if (!data) {
            return null;
        }

        return (
            <Wrapper>
                <Slider {...ProductTypeList.slickSettings}>
                    {
                        data.map((productType: ProductType) => {
                            return (
                                <Item
                                    key={productType.id}
                                    isSelected={selectedProductType === productType.id}
                                    onClick={() => setStore({ selectedProductType: productType.id })}
                                >
                                    <ThumbnailWrapper>
                                        <img src={productType.thumbnail.url} />
                                    </ThumbnailWrapper>
                                    <Label>{productType.name}</Label>
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
    background-color: #F6F5F6;
    border-bottom: 2px solid #D59B01;
    padding: 10px 0;
`;

type ItemProps = React.ComponentType<React.DOMAttributes<{}> & { isSelected: boolean }>;
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
