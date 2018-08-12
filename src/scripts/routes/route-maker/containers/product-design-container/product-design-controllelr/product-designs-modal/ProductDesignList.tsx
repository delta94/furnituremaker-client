import * as React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import { CommonStoreProps } from '@/configs';
import { ProductDesign, productDesignUtils } from '@/restful';
import { withStoreValues } from '@/app';
import { Img } from '@/components';

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

interface ProductDesignListProps extends CommonStoreProps {
    readonly designs: ProductDesign[];
    readonly onDesignClick: (design: ProductDesign) => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<CommonStoreProps>(o => o.selectedProductDesign),
    nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)
)
export class ProductDesignList extends React.Component<ProductDesignListProps> {
    static readonly defaultProps: ProductDesignListProps = {
        designs: [],
        onDesignClick: () => { /** onDesignClick */ }
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
            selectedProductDesignGroup,
            onDesignClick
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
                            <Item
                                key={productDesign.id}
                                isSelected={selectedProductDesign && selectedProductDesign.id === productDesign.id}
                                onClick={() => onDesignClick(productDesign)}
                            >
                                <ThumbnailWrapper>
                                    <Img className="mw-100" file={productDesign.thumbnail} />
                                </ThumbnailWrapper>
                                <Label>{productDesign.name}</Label>
                            </Item>
                        );
                    })
                }
            </Slider>
        );
    }
}
