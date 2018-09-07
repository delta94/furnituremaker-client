import * as React from 'react';

import { AntdButton } from '@/components';

export interface HomeProductListViewMoreBtnProps {
    readonly fetching: boolean;
    readonly onButtonClick: () => void;
}

export class HomeProductListViewMoreBtn extends React.PureComponent<HomeProductListViewMoreBtnProps> {
    public render() {
        const { fetching, onButtonClick } = this.props;
        return (
            <div style={{ textAlign: 'center' }}>
                <AntdButton
                    type="primary"
                    onClick={onButtonClick}
                    loading={fetching}
                    ghost={true}
                >
                    Xem thêm
                </AntdButton>
            </div>
        );
    }
}
