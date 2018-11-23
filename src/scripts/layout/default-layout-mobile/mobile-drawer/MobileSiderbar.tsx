import 'antd-mobile/lib/list/style/css';

import List from 'antd-mobile/lib/list';
import * as React from 'react';
import styled from 'styled-components';

const MobileSiderbarWrapper = styled.div`
    width: 300px;
`;

export const MobileSiderbar = () => (
    <MobileSiderbarWrapper>
        <List>
            {[0, 1, 2, 3, 4].map((i, index) => {
                if (index === 0) {
                    return (
                        <List.Item
                            key={index}
                            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                            multipleLine={true}
                        >
                            Category
                        </List.Item>
                    );
                }
                return (
                    <List.Item
                        key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                    >
                        Category {index}
                    </List.Item>);
            })}
        </List>
    </MobileSiderbarWrapper>
);