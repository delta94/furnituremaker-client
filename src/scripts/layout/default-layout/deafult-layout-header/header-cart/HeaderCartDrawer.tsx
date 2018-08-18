import * as React from 'react';

import { withStoreValues } from '@/app';
import { AntdDivider, AntdDrawer } from '@/components';
import { CommonStoreProps, Include } from '@/configs';

import { CartDrawerContent, CartDrawerFooter } from './header-cart-drawer';

export interface HeaderCartDrawerProps extends Include<CommonStoreProps, 'drawerVisible'> {
    readonly onDrawerClose: () => void;
}

@withStoreValues(nameof<HeaderCartDrawerProps>(o => o.drawerVisible))
export class HeaderCartDrawer extends React.PureComponent<HeaderCartDrawerProps> {
    render() {
        const {
            drawerVisible,
            onDrawerClose
        } = this.props;
        return (
            <AntdDrawer
                title="Giỏ hàng"
                width={400}
                visible={drawerVisible}
                onClose={onDrawerClose}
                closable={false}
                maskClosable={true}
            >
                <CartDrawerContent />
                <AntdDivider />
                <CartDrawerFooter />
            </AntdDrawer >
        );
    }
}