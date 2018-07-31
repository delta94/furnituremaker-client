import * as React from 'react';
import styled from 'styled-components';
import { CommonStoreProps } from '@/configs';
import { ProductType, productTypeUtils } from '@/restful';
import Slider, { Settings } from 'react-slick';
import { withStoreValues } from '@/app';
import { Img } from './generic';

const Wrapper = styled.div`
    background-color: #F6F5F6;
    border-bottom: 2px solid #D59B01;
    padding: 10px 0;
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

interface ProductTypeListProps extends CommonStoreProps {
    readonly productTypes: ProductType[];
    readonly onTypeClick: (type: ProductType) => void;
}

@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProductType))
export class ProductTypeList extends React.Component<ProductTypeListProps> {
    static readonly defaultProps: ProductTypeListProps = {
        productTypes: [],
        onTypeClick: () => { /** onTypeClick */ }
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    constructor(props: ProductTypeListProps) {
        super(props);

        const { productTypes, setStore } = props;

        // * Set default product type
        const defaulTypeGroup = productTypeUtils.getDefaultProductType(productTypes);
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedProductType)]: defaulTypeGroup
        });
    }

    render() {
        const {
            productTypes,
            selectedProductType,
            onTypeClick
        } = this.props;

        return (
            <Wrapper>
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
            </Wrapper>
        );
    }
}