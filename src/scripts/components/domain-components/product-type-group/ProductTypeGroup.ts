import styled from 'styled-components';

export const ProductTypeGroupWrapper = styled.div`
    margin: 0 auto;
    padding-top: 15px;
    width: 100%;
    .slick-slider {
        margin: 0 0px;
    }
    .slick-slide {
        padding-right: 4px;
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
    }
`;

export const ProductTypeGroupLabel = styled.span`
    font-size: 14px;
    display: block;
    margin: 0 0 5px 0;
    position: absolute;
    bottom: 15px;
    transition: all .2s;
`;