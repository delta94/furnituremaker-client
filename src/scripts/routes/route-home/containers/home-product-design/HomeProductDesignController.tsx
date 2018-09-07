import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container, Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesign } from '@/restful';

const Wrapper = styled.div`
    position: relative;
    padding: 25px 0px 0 0px;
    margin: 0 0 20px 0;
    .slick-list {
        margin: 0 -10px 0 -10px;
        overflow: unset;
    }
`;

const ItemSquare = styled.div`
    position: relative;
`;

const ItemRectangle = styled.div`
    position: relative;
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}

const ThumbnailWrapper: React.ComponentType<ItemProps> = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin: 0 10px;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
    transition: all .3s;
    &:hover {
        opacity: 1;
    }
`;

const Label = styled.span`
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 15px;
    right: 25px;
    line-height: normal;
    font-size: 18px;
    text-transform: uppercase;
`;

interface ProductDesignControllerProps
    extends Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProductType'>,
    Pick<CommonStoreProps, 'selectedProductDesign'> {
    readonly productDesigns: ProductDesign[];
}

@withStoreValues<ProductDesignControllerProps>(
    'setStore',
    'selectedProductType',
    'selectedProductDesign'
)
export class HomeProductDesignController extends React.PureComponent<ProductDesignControllerProps> {
    static readonly slickSettings: Settings = {
        variableWidth: true,
        infinite: false,
        speed: 500,
        centerMode: false,
        slidesToScroll: 10
    };

    render() {
        const { productDesigns, selectedProductDesign, setStore } = this.props;
        return (
            <Wrapper>
                <Container>
                    <Slider {...HomeProductDesignController.slickSettings}>
                        {
                            productDesigns.map(o => {
                                const ItemWrapper = o.coverPhotoShape === 'rectangle' ? ItemRectangle : ItemSquare;
                                const isSelected = selectedProductDesign && (
                                    selectedProductDesign.id === o.id
                                );

                                return (
                                    <ItemWrapper
                                        key={o.id}
                                        onClick={() => {
                                            setStore<ProductDesignControllerProps>({
                                                selectedProductDesign: o
                                            });
                                        }}
                                    >
                                        <ThumbnailWrapper isSelected={isSelected}>
                                            <Img
                                                className="mw-100 w-100"
                                                file={o.coverPhoto}
                                            />
                                        </ThumbnailWrapper>
                                        <Label>{o.title || o.name}</Label>
                                    </ItemWrapper>
                                );
                            })
                        }
                    </Slider>
                </Container>
            </Wrapper>
        );
    }
}