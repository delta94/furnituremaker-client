import styled from 'styled-components';

import { mobileSize } from '@/configs';

export const ProductTypeGroupWrapper = styled.div`
    margin: 0 auto;
    padding-top: 15px;
    width: 100%;
    @media screen and (max-width: ${mobileSize}px){
        padding-top: 5px;
    }
`;

interface ItemProps extends React.DOMAttributes<HTMLDivElement> {
    readonly isSelected: boolean;
    readonly canClick: boolean;
}

type ItemType = React.ComponentType<ItemProps>;

export const ProductTypeGroupItem: ItemType = styled.div`
    text-align: center;
    cursor: ${(props: ItemProps) => props.canClick && 'pointer'};
    height:  165px; 
    flex-direction: column;
    position: relative;
    transition: all .2s;
    background: #fff;
    @media screen and (max-width: ${mobileSize}px){
        height:  130px; 
    }
`;

export const ProductTypeGroupItemContent: ItemType = styled.div`
    display: flex!important;
    justify-content: center;
    align-items: center;
    height: ${(props: ItemProps) => props.isSelected ? '165px' : '150px'};
    border: ${(props: ItemProps) => props.isSelected ? '3px solid #FFC12E' : '1px solid #E9E9E9'};
    border-bottom-width: ${(props: ItemProps) => props.isSelected ? '15px' : '1px'};
    padding: ${(props: ItemProps) => props.isSelected ? '0' : '3px'};
    transition: all .2s ease-in;
    &:hover {
        height: 165px;
        border: 3px solid #FFC12E;
        border-bottom-width: 15px;
        @media screen and (max-width: ${mobileSize}px){
            height:  130px; 
            border-bottom-width: 10px;
        }
    }
    @media screen and (max-width: ${mobileSize}px){
        height: ${(props: ItemProps) => props.isSelected ? '130px' : '120px'};
        border-bottom-width: ${(props: ItemProps) => props.isSelected ? '10px' : '1px'};
    }
`;

export const ProductTypeGroupThumbnailWrapper = styled.div`
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        max-width: 90%!important;
        transition: all .2s;
        @media screen and (max-width: ${mobileSize}px) {
            max-width: 80%!important;
        }
    }
`;

export const ProductTypeGroupLabel = styled.span`
    font-size: 14px;
    display: block;
    margin: 0 0 5px 0;
    position: absolute;
    bottom: 15px;
    transition: all .2s;
    @media screen and (max-width: ${mobileSize}px){
        font-size: 12px;
        bottom: 10px;
    }
`;