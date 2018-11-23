import 'antd-mobile/lib/drawer/style/css';
import './MobileDrawer.scss';

import Drawer from 'antd-mobile/lib/drawer';
import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

import { MobileSiderbar } from './mobile-drawer';
import { MobileHeader } from './MobileHeader';
import { MobileTabbar } from './MobileTabbar';

type MobileDrawerProps =
    Pick<CommonStoreProps, 'setStore'> &
    Pick<CommonStoreProps, 'drawerVisibled'>;

@withStoreValues<MobileDrawerProps>('drawerVisibled')
export class MobileDrawer extends React.PureComponent<MobileDrawerProps> {
    render() {
        const { drawerVisibled, setStore } = this.props;
        return (
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight}}
                contentStyle={{
                    color: '#A6A6A6',
                    textAlign: 'center',

                }}
                sidebar={<MobileSiderbar />}
                position="right"
                open={drawerVisibled}
                onOpenChange={() => setStore({ drawerVisibled: !drawerVisibled })}
            >
                <MobileHeader />
                {this.props.children}
                <MobileTabbar />
            </Drawer>
        );
    }
}