import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesign, productDesignUtils } from '@/restful';

interface ItemProps extends React.DOMAttributes<ItemProps> {
    readonly isSelected: boolean;
}

const Item: React.ComponentType<ItemProps> = styled.div`
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
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

interface ProductDesignListProps extends CommonStoreProps {
    readonly designs: ProductDesign[];
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<CommonStoreProps>(o => o.selectedProductDesign),
    nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)
)
export class ProductDesignList extends React.Component<ProductDesignListProps> {
    static readonly defaultProps: ProductDesignListProps = {
        designs: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    constructor(props: ProductDesignListProps) {
        super(props);

        const { designs, selectedProductDesign, setStore } = props;

        // * Set default product design
        if (!selectedProductDesign) {
            const defaulDesign = productDesignUtils.getDefaultProductDesigns(designs);
            setStore({
                [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: defaulDesign
            });
        }
    }

    render() {
        const {
            designs,
            selectedProductType,
            selectedProductDesign,
            selectedProductDesignGroup
        } = this.props;

        if (!designs || !selectedProductType) {
            return null;
        }

        const filterdDesigns = selectedProductDesignGroup ?
            designs.filter(o => o.designGroup.id === selectedProductDesignGroup.id) :
            designs;

        return (
            <Slider {...ProductDesignList.slickSettings}>
                {
                    filterdDesigns.map((productDesign: ProductDesign) => {
                        return (
                            <Link key={productDesign.id} to={`/?design=${productDesign.id}`}>
                                <Item
                                    isSelected={selectedProductDesign && selectedProductDesign.id === productDesign.id}
                                >
                                    <ThumbnailWrapper>
                                        <Img className="mw-100" file={productDesign.thumbnail} />
                                    </ThumbnailWrapper>
                                    <Label>{productDesign.name}</Label>
                                </Item>
                            </Link>
                        );
                    })
                }
            </Slider>
        );
    }
}
