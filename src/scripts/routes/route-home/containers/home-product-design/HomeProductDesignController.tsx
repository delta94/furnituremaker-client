import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesign } from '@/restful';

const Wrapper = styled.div`
    position: relative;
    height: 1px;
`;

interface ContentProps extends React.DOMAttributes<HTMLDivElement> {
    readonly showList: boolean;
}

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}

const ItemSquare: React.ComponentType<ItemProps> = styled.div`
    width: 250px!important;
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
    overflow: hidden;
`;

const ItemRectangle: React.ComponentType<ItemProps> = styled.div`
    width: 500px!important;
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    transition: all .3s;
    opacity: ${(props: ItemProps) => props.isSelected ? 1 : 0.5};
    cursor: pointer;
    overflow: hidden;
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

interface ProductDesignControllerProps
    extends Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProductType'> {
    readonly productDesigns: ProductDesign[];
}

@withStoreValues<ProductDesignControllerProps>('selectedProductType')
export class HomeProductDesignController extends React.PureComponent<ProductDesignControllerProps> {
    static readonly slickSettings: Settings = {
        variableWidth: true,
        infinite: false,
        speed: 500,
        centerMode: false,
        slidesToScroll: 3
    };

    render() {
        const { productDesigns } = this.props;
        return (
            <Wrapper>
                <Slider {...HomeProductDesignController.slickSettings}>
                    {
                        productDesigns.map(o => {
                            const ItemWrapper = o.coverPhotoShape === 'rectangle' ? ItemRectangle : ItemSquare;
                            return (
                                <ItemWrapper
                                    key={o.id}
                                    isSelected={false}
                                >
                                    <ThumbnailWrapper>
                                        <Img className="mw-100" file={null} />
                                    </ThumbnailWrapper>
                                    <Label>X</Label>
                                </ItemWrapper>
                            );
                        })
                    }
                </Slider>
            </Wrapper>
        );
    }
}