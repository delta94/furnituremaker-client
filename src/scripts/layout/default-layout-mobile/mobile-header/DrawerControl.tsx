import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdIcon } from '@/components';
import { CommonStoreProps } from '@/configs';

import { IconWrapper } from './IconWrapper';

type MobileDrawerProps =
    Pick<CommonStoreProps, 'setStore'> &
    Pick<CommonStoreProps, 'drawerVisibled'>;

@withStoreValues<MobileDrawerProps>('drawerVisibled')
export class DrawerControl extends React.PureComponent<MobileDrawerProps> {
    public render() {
        const { setStore, drawerVisibled } = this.props;
        return (
            <IconWrapper
                onClick={() => setStore({ drawerVisibled: !drawerVisibled })}
            >
                <AntdIcon type="ellipsis" />
            </ IconWrapper >
        );
    }
}
