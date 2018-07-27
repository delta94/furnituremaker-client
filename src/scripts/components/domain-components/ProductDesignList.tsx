import * as React from 'react';
import styled from 'styled-components';
import { RestfulComponentRenderProps } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import { ProductDesign } from '@/restful';
import Slider, { Settings } from 'react-slick';
import { withStoreValues } from '@/app';

interface ProductDesignListProps extends
    CommonStoreProps,
    RestfulComponentRenderProps<ProductDesign[]> {
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<CommonStoreProps>(o => o.selectedProductDesign),
    nameof<CommonStoreProps>(o => o.selectedProductDesignGroup),
)
export class ProductDesignList extends React.Component<ProductDesignListProps> {
    static slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    render() {
        const { data, selectedProductType, selectedProductDesign, selectedProductDesignGroup, setStore } = this.props;

        if (!data || !selectedProductType) {
            return null;
        }

        const filterdDesigns = selectedProductDesignGroup ?
            data.filter(o => o.designGroup.id === selectedProductDesignGroup) :
            data;

        return (
            <Wrapper>
                <Slider {...ProductDesignList.slickSettings}>
                    {
                        filterdDesigns.map((productDesign: ProductDesign) => {
                            return (
                                <Item
                                    key={productDesign.id}
                                    isSelected={selectedProductDesign === productDesign.id}
                                    onClick={() => setStore({ selectedProductDesign: productDesign.id })}
                                >
                                    <ThumbnailWrapper>
                                        <img className="mw-100" src={productDesign.thumbnail.url} />
                                    </ThumbnailWrapper>
                                    <Label>{productDesign.name}</Label>
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
