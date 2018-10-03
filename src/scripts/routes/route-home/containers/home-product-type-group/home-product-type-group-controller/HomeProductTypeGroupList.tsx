import * as React from 'react';
import Slider, { Settings } from 'react-slick';

import { withStoreValues } from '@/app';
import {
    Container,
    Img,
    ProductTypeGroupItem,
    ProductTypeGroupItemContent,
    ProductTypeGroupLabel,
    ProductTypeGroupThumbnailWrapper,
    ProductTypeGroupWrapper
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup } from '@/restful';

interface HomeProductTypeGroupListProps extends
    Pick<CommonStoreProps, 'selectedProductTypeGroup'>,
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'> {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly onProductTypeGroupClick: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupHover: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupLeave: () => void;
}

@withStoreValues<HomeProductTypeGroupListProps>(
    'hoveredProductTypeGroup',
    'selectedProductTypeGroup'
)
export class HomeProductTypeGroupList extends React.Component<HomeProductTypeGroupListProps> {
    static readonly defaultProps: Partial<HomeProductTypeGroupListProps> = {
        productTypeGroups: []
    };

    static readonly slickSettings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1
    };

    render() {
        const {
            hoveredProductTypeGroup,
            selectedProductTypeGroup,
            onProductTypeGroupHover,
            onProductTypeGroupLeave,
            onProductTypeGroupClick,
            productTypeGroups
        } = this.props;

        const newProductTypeGroups = [...productTypeGroups];
        newProductTypeGroups.splice(1, 0, {
            id: 'wtf?',
            name: 'Khuyến mãi',
            productTypes: [],
            thumbnail: {
                url: '/static/assets/khuyen-mai.png'
            }
        });

        return (
            <Container>
                <ProductTypeGroupWrapper>
                    <Slider {...HomeProductTypeGroupList.slickSettings}>
                        {
                            newProductTypeGroups
                                .map(productTypeGroup => {
                                    const isSelected = hoveredProductTypeGroup ?
                                        hoveredProductTypeGroup.id === productTypeGroup.id :
                                        (
                                            selectedProductTypeGroup &&
                                            selectedProductTypeGroup.id === productTypeGroup.id
                                        );

                                    const canClick = (
                                        productTypeGroup &&
                                        productTypeGroup.productTypes
                                    ) && productTypeGroup.productTypes.length === 1;

                                    return (
                                        <ProductTypeGroupItem
                                            key={productTypeGroup.id}
                                            isSelected={isSelected}
                                            canClick={canClick}
                                            onClick={() => onProductTypeGroupClick(productTypeGroup)}
                                            onMouseOver={() => {
                                                onProductTypeGroupHover(productTypeGroup);

                                            }}
                                            onMouseLeave={() => {
                                                onProductTypeGroupLeave();
                                            }}
                                        >
                                            <ProductTypeGroupItemContent isSelected={isSelected} canClick={false}>
                                                <ProductTypeGroupThumbnailWrapper>
                                                    <Img file={productTypeGroup.thumbnail} />
                                                </ProductTypeGroupThumbnailWrapper>
                                                <ProductTypeGroupLabel>{productTypeGroup.name}</ProductTypeGroupLabel>
                                            </ProductTypeGroupItemContent>
                                        </ProductTypeGroupItem>
                                    );
                                })
                        }
                    </Slider>
                </ProductTypeGroupWrapper>
            </Container>
        );
    }
}