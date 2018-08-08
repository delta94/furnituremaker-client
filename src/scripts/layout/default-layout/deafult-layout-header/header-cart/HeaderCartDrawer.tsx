import * as React from 'react';
import { withStoreValues } from '@/app';
import { AntdDrawer, AntdDivider } from '@/components';
import { CartDrawerContent, CartDrawerFooter } from './header-cart-drawer';

export interface HeaderCartDrawerProps {
    readonly drawerVisible?: boolean;
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
                destroyOnClose={true}
            >
                <CartDrawerContent />
                <AntdDivider />
                <CartDrawerFooter />
            </AntdDrawer >
        );
    }
}