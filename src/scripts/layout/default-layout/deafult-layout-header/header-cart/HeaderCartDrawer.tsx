import './HeaderCartDrawer.scss';

import * as React from 'react';

import { withStoreValues } from '@/app';
import { AntdDivider, AntdDrawer } from '@/components';
import { CommonStoreProps } from '@/configs';

import {
    CartDrawerContent,
    CartDrawerFooter,
    CartDrawerHeader
} from './header-cart-drawer';

export interface HeaderCartDrawerProps extends
    Pick<CommonStoreProps, 'drawerVisible'> {
    readonly onDrawerClose: () => void;
}

@withStoreValues<HeaderCartDrawerProps>('drawerVisible')
export class HeaderCartDrawer extends React.PureComponent<HeaderCartDrawerProps> {

    componentDidUpdate(prevProps: HeaderCartDrawerProps) {
        if (this.props.drawerVisible !== prevProps.drawerVisible) {
            const header = document.getElementById('header');
            const top = header.offsetHeight + header.offsetTop;

            const headerDrawer = document.getElementsByClassName('header-drawer')[0] as HTMLDivElement;
            if (this.props.drawerVisible) {
                headerDrawer.style.top = `${top}px`;
                headerDrawer.style.height = `calc(100% - ${top})`;
            } else {
                setTimeout(
                    () => {
                        headerDrawer.style.height = '';
                    },
                    200
                );
            }
            const mask = headerDrawer.getElementsByClassName('ant-drawer-mask')[0] as HTMLDivElement;
            if (this.props.drawerVisible) {
                mask.style.height = `calc(100% - ${top}px)`;
            } else {
                setTimeout(
                    () => {
                        mask.style.height = '';
                    },
                    200
                );
            }

            const content = headerDrawer.getElementsByClassName('ant-drawer-content-wrapper')[0] as HTMLDivElement;
            if (this.props.drawerVisible) {
                content.style.height = `calc(100% - ${top}px)`;
            } else {
                setTimeout(
                    () => {
                        content.style.height = ``;
                    },
                    200
                );
            }
        }
    }

    render() {
        const {
            drawerVisible,
            onDrawerClose
        } = this.props;
        return (
            <AntdDrawer
                className="header-drawer"
                title={<CartDrawerHeader />}
                width={562}
                visible={drawerVisible}
                onClose={onDrawerClose}
                closable={false}
                maskClosable={true}
                destroyOnClose={true}
            >
                <CartDrawerContent mode="simple" />
                <CartDrawerFooter />
            </AntdDrawer >
        );
    }
}