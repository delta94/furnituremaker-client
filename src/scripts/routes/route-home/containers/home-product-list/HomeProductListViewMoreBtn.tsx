import * as React from 'react';
import { ResourceParameter } from 'react-restful';

import { AntdButton } from '@/components';
import { productResources, restfulFetcher } from '@/restful';

export interface HomeProductListViewMoreBtnProps {
    readonly fetchParams: ResourceParameter[];
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

        return (
            <div style={{ textAlign: 'center' }}>
                <AntdButton
                    type="primary"
                    onClick={() => {
                        onButtonClick();
                    }}
                    loading={fetching}
                    ghost={true}
                    disabled={remaningProducts === 0}
                >
                    Xem thêm (còn {remaningProducts} sản phẩm)
                </AntdButton>
            </div>
        );
    }
}
