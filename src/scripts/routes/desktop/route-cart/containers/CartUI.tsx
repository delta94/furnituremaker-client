import * as React from 'react';
import styled from 'styled-components';

import { AntdDivider } from '@/components';

export const SectionTitle = styled.h3`
    display: bold;
    text-transform: uppercase;
`;

export const ShippingCost = styled.div`
    text-align: right;
    font-size: 16px;
    color: #000000;
`;

const DividerWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export function CartDivider(props: {}) {
    return (
        <DividerWrapper>
            <AntdDivider type="vertical" style={{ height: 200 }} />
        </DividerWrapper>
    );
}