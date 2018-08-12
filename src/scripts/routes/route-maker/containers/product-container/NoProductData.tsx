import * as React from 'react';
import styled from 'styled-components';

const NoProductDataWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
`;

export function NoProductData(props: {}) {
    return (
        <NoProductDataWrapper>
            Không tìm thấy dữ liệu!
       </NoProductDataWrapper>
    );
}