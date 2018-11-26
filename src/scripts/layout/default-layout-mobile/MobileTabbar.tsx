import 'antd-mobile/lib/tab-bar/style/css';

import { TabBar } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdIcon } from '@/components';
import { CommonStoreProps } from '@/configs';

const MobileTabbarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    .am-tab-bar-bar {
        height: 56px;
    }
    .am-tab-bar-tab-icon {
        font-size: 18px;
    }
    .am-tab-bar-tab-title {
        font-size: 11px!important;
        user-select: none;
    }
`;

export interface MobileTabbarProps extends Pick<CommonStoreProps, 'history'> {
}

@withStoreValues('history')
export class MobileTabbar extends React.PureComponent<MobileTabbarProps> {
    public render() {
        return (
            <MobileTabbarWrapper>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#EFB416"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="Tài khoản"
                        key="Life"
                        icon={<AntdIcon type="user" />}
                        selectedIcon={<AntdIcon type="user" />}
                        selected={true}
                    />
                    <TabBar.Item
                        title="Thông báo"
                        key="Life"
                        icon={<AntdIcon type="notification" />}
                        selectedIcon={<AntdIcon type="notification" />}
                    />
                    <TabBar.Item
                        title="Giỏ hàng"
                        key="Life"
                        icon={<AntdIcon type="shopping-cart" />}
                        selectedIcon={<AntdIcon type="shopping-cart" />}
                        onPress={() => this.props.history.push('/cart')}
                    />
                </TabBar>
            </MobileTabbarWrapper>
        );
    }
}
