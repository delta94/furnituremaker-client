import * as React from 'react';
import { RequestParameter } from 'react-restful';
import styled from 'styled-components';

import { AntdButton, Container } from '@/components';
import { productResources, restfulFetcher } from '@/restful';

const HomeProductListViewMoreBtnWrapper = styled.div`
    margin-top: 20px;
    button {
        background: #AAAAAA!important;
        height: 40px;
    }
`;

export interface HomeProductListViewMoreBtnProps {
    readonly fetchParams: RequestParameter[];
    readonly loadedProducts: number;
    readonly fetching: boolean;
    readonly onButtonClick: () => void;
}

export class HomeProductListViewMoreBtn extends React.PureComponent<HomeProductListViewMoreBtnProps> {
    readonly state: {
        readonly remaningProducts: number
    };

    readonly countProducts = async () => {
        const { fetchParams, loadedProducts } = this.props;
        const totalProducts = await restfulFetcher.fetchResource(
            productResources.count,
            fetchParams
        );

        this.setState({
            remaningProducts: (totalProducts - loadedProducts)
        });
    }

    constructor(props: HomeProductListViewMoreBtnProps) {
        super(props);
        this.state = {
            remaningProducts: 0
        };
    }

    componentDidUpdate(prevProps: HomeProductListViewMoreBtnProps) {
        const { fetchParams, loadedProducts } = this.props;
        if (
            prevProps.fetchParams !== fetchParams ||
            prevProps.loadedProducts !== loadedProducts
        ) {
            this.countProducts();
        }
    }

    public render() {
        const { fetching, onButtonClick } = this.props;
        const { remaningProducts } = this.state;
        
        if (!remaningProducts) {
            return null;
        }

        return (
            <Container>
                <HomeProductListViewMoreBtnWrapper>
                    <AntdButton
                        type="primary"
                        onClick={() => {
                            onButtonClick();
                        }}
                        loading={fetching}
                        ghost={true}
                        disabled={remaningProducts === 0}
                        style={{
                            borderRadius: 0,
                            width: '100%',
                            color: '#fff',
                            border: 0
                        }}
                    >
                        Xem thêm (còn {remaningProducts} sản phẩm)
                    </AntdButton>
                </HomeProductListViewMoreBtnWrapper>
            </Container>
        );
    }
}
