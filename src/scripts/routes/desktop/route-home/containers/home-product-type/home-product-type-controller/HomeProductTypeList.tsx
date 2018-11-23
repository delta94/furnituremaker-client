import * as React from 'react';
import Slider, { Settings } from 'react-slick';

import { withStoreValues } from '@/app';
import {
    Container,
    Img,
    ProductTypeContent,
    ProductTypeItem,
    ProductTypeLabel,
    ProductTypeThumbnailWrapper,
    ProductTypeWrapper
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductType } from '@/restful';

export type HomeProductTypeListStoreProps = {
    readonly showHomeProductTypeList?: boolean;
};

interface HomeProductTypeListProps extends CommonStoreProps, HomeProductTypeListStoreProps {
    readonly productTypes: ProductType[];
    readonly onTypeClick: (type: ProductType) => void;
    readonly onMouseHoverOnList: () => void;
    readonly onMouseLeaveList: () => void;
}

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<HomeProductTypeListProps>(o => o.showHomeProductTypeList)
)
export class HomeProductTypeList extends React.Component<HomeProductTypeListProps> {
    static readonly defaultProps: Partial<HomeProductTypeListProps> = {
        showHomeProductTypeList: false,
        productTypes: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    render() {
        const {
            productTypes,
            selectedProductType,
            onTypeClick,
            showHomeProductTypeList,
            onMouseHoverOnList,
            onMouseLeaveList
        } = this.props;

        return (
            <Container>
                <ProductTypeWrapper>
                    <ProductTypeContent
                        showList={showHomeProductTypeList}
                        onMouseEnter={onMouseHoverOnList}
                        onMouseLeave={onMouseLeaveList}
                    >
                        <Slider {...HomeProductTypeList.slickSettings}>
                            {
                                productTypes.map((productType: ProductType) => {
                                    return (
                                        <ProductTypeItem
                                            key={productType.id}
                                            isSelected={selectedProductType &&
                                                selectedProductType.id === productType.id}
                                            onClick={() => onTypeClick(productType)}
                                        >
                                            <ProductTypeThumbnailWrapper>
                                                <Img className="mw-100 w-100" file={productType.thumbnail} />
                                            </ProductTypeThumbnailWrapper>
                                            <ProductTypeLabel>{productType.name}</ProductTypeLabel>
                                        </ProductTypeItem>
                                    );
                                })
                            }
                        </Slider>
                    </ProductTypeContent>
                </ProductTypeWrapper>
            </Container>
        );
    }
}