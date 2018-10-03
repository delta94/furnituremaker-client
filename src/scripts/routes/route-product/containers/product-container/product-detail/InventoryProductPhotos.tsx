import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';

const Wrapper = styled.div`
    padding: 0;
    .slick-prev, .slick-next {
        height: 50px;
        width: 50px;
        z-index: 1;
    }
`;

const Item = styled.div`
    padding: 0 2px;
`;

export interface InventoryProductPhotosProps extends
    Pick<CommonStoreProps, 'selectedProductDesign'> {
}

@withStoreValues<InventoryProductPhotosProps>('selectedProductDesign')
export class InventoryProductPhotos extends React.PureComponent<InventoryProductPhotosProps> {
    static readonly slickSettings: Settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <Img file="/static/assets/right.png" />,
        prevArrow: <Img file="/static/assets/left.png" />
    };

    public render() {
        const { selectedProductDesign } = this.props;
        if (!selectedProductDesign || !selectedProductDesign.photos) {
            return null;
        }

        const { photos } = selectedProductDesign;

        return (
            <Wrapper>
                <Slider {...InventoryProductPhotos.slickSettings}>
                    {
                        photos.map((o, i) => {
                            return (
                                <Item key={i}>
                                    <Img className="w-100 wm-100" file={o.url} />
                                </Item>
                            );
                        })
                    }
                </Slider>
            </Wrapper>
        );
    }
}
