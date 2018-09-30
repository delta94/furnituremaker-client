import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container } from '@/components';
import { CommonStoreProps } from '@/configs';
import { Product, ProductDesign } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { HomeProductDesignItem } from './home-product-design-controller';

const Wrapper = styled.div`
    position: relative;
    margin: 0 0 20px 0;
    .slick-track {
        margin-left: 0;
        overflow: unset;
    }
    .slick-slide {
        padding-right: 4px;
    }
`;

interface ProductDesignControllerProps
    extends Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProductDesign'> {
    readonly productDesigns: ProductDesign[];
}

@withStoreValues<ProductDesignControllerProps>(
    'setStore',
    'selectedProductDesign'
)
export class HomeProductDesignController extends React.PureComponent<ProductDesignControllerProps> {
    static readonly slickSettings: Settings = {
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
    };

    constructor(props: ProductDesignControllerProps) {
        super(props);
        const { productDesigns, setStore } = this.props;

        const urlSearchDesign = getUrlSearchParam(
            nameof<Product>(o => o.design),
            location.search
        );

        const wantedDesign = productDesigns.find(o => o.id === urlSearchDesign);

        setStore<ProductDesignControllerProps>({
            selectedProductDesign: wantedDesign || productDesigns[0]
        });
    }

    render() {
        const { productDesigns } = this.props;
        return (
            <Container>
                <Wrapper>
                    <Container>
                        <Slider {...HomeProductDesignController.slickSettings}>
                            {
                                productDesigns.map(o => {
                                    return (
                                        <HomeProductDesignItem
                                            key={o.id}
                                            productDesign={o}
                                        />
                                    );
                                })
                            }
                        </Slider>
                    </Container>
                </Wrapper>
            </Container>
        );
    }
}