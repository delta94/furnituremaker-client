import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';

const TopbarWrapper = styled.div`
    padding: 15px;
    background-color: #EFB416;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 15px;
    color: #fff;
`;

export function Topbar(props: {}) {
    return (
        <TopbarWrapper>
            <Img width={30} height={30} file="/static/assets/checkbox-checked.png" />
            <div style={{ marginLeft: 15 }}>
                Lựa chọn chi tiết vật liệu và cấu kiện bên dưới<br />
                <span style={{ color: 'black' }}>Thiết kế của sản phẩm</span>  sẽ thay đổi theo lựa chọn
            </div>
        </TopbarWrapper>
    );
}