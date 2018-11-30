import styled from 'styled-components';

import { mobileSize } from '@/configs';

export const ProductTypeWrapper = styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    .slick-slide {
        padding-right: 4px;
    }

    .slick-prev, .slick-next  {
        color: #000;
    }

    .slick-prev {
        left: 0;
        z-index: 1;
    }
    .slick-next {
        right: 0;
    }
`;

interface ContentProps extends React.DOMAttributes<HTMLDivElement> {
    readonly showList: boolean;
}

export const ProductTypeContent: React.ComponentType<ContentProps> = styled.div`
    position: absolute;
    width: 100%;
    height: 230px;
    background: #fff;
    transition: visibility 0s, opacity 0.3s;
    visibility : ${(props: ContentProps) => props.showList ? 'visible' : 'hidden'};
    opacity : ${(props) => props.showList ? 1 : 0};
    @media screen and (max-width: ${mobileSize}px){
        height: 105px;
    }
`;

interface ProductTypeItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
}
export const ProductTypeItem: React.ComponentType<ProductTypeItemProps> = styled.div`
    text-align: center;
    transition: all .3s;
    background: #FFC12E;
    opacity: ${(props: ProductTypeItemProps) => props.isSelected ? 1 : 1};
    cursor: pointer;
    height: 220px;
    @media screen and (max-width: ${mobileSize}px){
        height: 100px;
    }
`;

export const ProductTypeThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProductTypeLabel = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    @media screen and (max-width: ${mobileSize}px){
        font-size: 13px;
    }
`;