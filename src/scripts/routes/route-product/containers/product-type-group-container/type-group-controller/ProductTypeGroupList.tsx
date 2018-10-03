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

interface ProductTypeGroupListProps extends
    Pick<CommonStoreProps, 'selectedProductTypeGroup'>,
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'> {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly onProductTypeGroupClick: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupHover: (productTypeGroup: ProductTypeGroup) => void;
    readonly onProductTypeGroupLeave: () => void;
}

@withStoreValues<ProductTypeGroupListProps>(
    'selectedProductTypeGroup',
    'hoveredProductTypeGroup'
)
export class ProductTypeGroupList extends React.Component<ProductTypeGroupListProps> {
    static readonly defaultProps: Partial<ProductTypeGroupListProps> = {
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
            onProductTypeGroupClick
        } = this.props;

        return (
            <Container>
                <ProductTypeGroupWrapper>
                    <Slider {...ProductTypeGroupList.slickSettings}>
                        <ProductTypeGroupItem
                            isSelected={false}
                            canClick={false}
                            onMouseOver={() => null}
                            onMouseLeave={() => null}
                        >
                            <ProductTypeGroupItemContent canClick={false} isSelected={false}>
                                <ProductTypeGroupThumbnailWrapper>
                                    <Img file="/static/assets/make-to-order.png" />
                                </ProductTypeGroupThumbnailWrapper>
                                <ProductTypeGroupLabel>Make To Order</ProductTypeGroupLabel>
                            </ProductTypeGroupItemContent>
                        </ProductTypeGroupItem>
                        {
                            this.props.productTypeGroups.map(productTypeGroup => {
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
                                        <ProductTypeGroupItemContent canClick={canClick} isSelected={isSelected}>
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