import * as React from 'react';
import styled from 'styled-components';

import { colorPrimary } from '@/configs';

import { AntdIcon } from '../../antd-component';

const LoadingWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorPrimary};
`;

export function Loading(props: {}) {
    return (
        <LoadingWrapper>
            <AntdIcon
                type="loading"
                spin={true}
                style={{ fontSize: '18px' }}
            />
        </LoadingWrapper>
    );
} 