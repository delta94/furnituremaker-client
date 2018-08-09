import * as React from 'react';

import { AntdSpin, AntdIcon } from '@/components/antd-component';
import { Condition } from './Condition';

import styled from 'styled-components';
import { withStoreValues } from '@/app';

const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 9;
`;

export interface PageLoadingProps {
    readonly showPageLoading?: boolean;
}

function PageLoadingComponent(props: PageLoadingProps) {
    return (
        <Condition condition={props.showPageLoading}>
            <Condition.Then>
                <LoadingWrapper>
                    <AntdSpin
                        tip="Đang tải dữ liệu..."
                        indicator={<AntdIcon type="loading" style={{ fontSize: 24 }} spin={true} />}
                    />
                </LoadingWrapper>
            </Condition.Then>
        </Condition>
    );
}

export const PageLoading = withStoreValues(
    nameof<PageLoadingProps>(o => o.showPageLoading)
)(PageLoadingComponent);
