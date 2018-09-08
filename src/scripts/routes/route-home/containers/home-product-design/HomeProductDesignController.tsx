import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Container } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesign } from '@/restful';

import { HomeProductDesignItem } from './home-product-design-controller';

const Wrapper = styled.div`
    position: relative;
    padding: 25px 0px 0 0px;
    margin: 0 0 20px 0;
    .slick-list {
        margin: 0 -10px 0 -10px;
        overflow: unset;
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
        variableWidth: true,
        infinite: false,
        speed: 500,
        centerMode: false,
        slidesToScroll: 10
    };

    constructor(props: ProductDesignControllerProps) {
        super(props);
        const { selectedProductDesign, productDesigns, setStore } = this.props;

        if (!selectedProductDesign) {
            setStore<ProductDesignControllerProps>({
                selectedProductDesign: productDesigns[0]
            });
        }
    }

    render() {
        const { productDesigns } = this.props;
        return (
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
        );
    }
}