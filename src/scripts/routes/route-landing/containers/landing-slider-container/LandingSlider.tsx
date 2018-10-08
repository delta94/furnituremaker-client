import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { Img } from '@/components';
import { Slide } from '@/restful';

const LandingSliderWrapper = styled.div`
    display: 'block';
    .slick-dots {
        bottom: 25px;
        button {
            &:before {
                opacity: .75;
                font-size: 20px;
                color: #fff;
            }
        }
        
        .slick-active button:before {
            color: #EFB416;
        }
    }
`;

const Item = styled.div`
    display: 'block';
`;

export interface LandingSliderProps {
    readonly slides: Slide[];
}

export class LandingSlider extends React.PureComponent<LandingSliderProps> {
    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    public render() {
        const { slides } = this.props;

        return (
            <LandingSliderWrapper>
                <Slider {...LandingSlider.slickSettings}>
                    {
                        slides.map(slide => {
                            return (
                                <Item key={slide.id}>
                                    <Img className="mw-100 w-100" file={slide.image} />
                                </Item>
                            );
                        })
                    }
                </Slider>
            </LandingSliderWrapper>
        );
    }
}