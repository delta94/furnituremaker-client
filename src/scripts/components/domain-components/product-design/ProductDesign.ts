import styled from 'styled-components';

export const ProductDesignWrapper = styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    .slick-slide {
        padding-right: 4px;
    }

    .slick-prev, .slick-next  {
        display: block;
        height: 100%;
        width: 50px;
        ::before {
            color: #000;
        }
    }

    .slick-prev {
        z-index: 1;
    }
    .slick-next {
        z-index: 1;
    }
`;