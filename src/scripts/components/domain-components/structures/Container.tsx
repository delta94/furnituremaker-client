import styled from 'styled-components';

import { mobileSize } from '@/configs';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    @media screen and (max-width: 1200px) {
        padding: 0 15px;
    }

    @media screen and (max-width: ${mobileSize}px) {
        padding: 0 5px;
        .slick-slider {
            margin: 0 0px;
        }
        .slick-slide {
            padding-right: 4px;
        }
        .slick-track {
            margin-left: 0px;
        }
        .slick-next {
            right: 0;
        }
    }
`;