import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdBadge, AntdIcon } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import {
    orderDetailUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

import { HeaderCartDrawer, HeaderCartDrawerProps } from './header-cart';

const HeaderCartButtonWrapper = styled.div`
    height: 60px;
    width: 60px;
    color: #FFFFFF;
    transition: all .2s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        background-color: ${colorPrimary};
    }
`;

const HeaderCartBadgeWapper = styled.span`
    width: 40px;
    position: relative;
    transform: translateX(-50%);
    left: 50%;
`;

const HeaderCartBadge = styled.span`
    width: 25px;
    height: 20px;
    border-radius: 4px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
`;

type DefaultLayoutHeaderProps = CommonStoreProps & Partial<WithTempOrderDetails>;

@withTempOrderDetails
@withStoreValues()
export class HeaderCart extends React.Component<DefaultLayoutHeaderProps> {
    render() {
        const { orderDetails, setStore } = this.props;
        const quantity = orderDetailUtils.getQuantity(orderDetails);
        return (
            <React.Fragment>
                <HeaderCartButtonWrapper
                    onClick={(e) => {
                        if (!quantity) {
                            return;
                        }
                        setStore({ [nameof<HeaderCartDrawerProps>(o => o.drawerVisible)]: true });
                    }}
                >
                    <HeaderCartBadgeWapper>
                        <AntdBadge count={quantity} showZero={true}>
                            <HeaderCartBadge>
                                <AntdIcon type="shopping-cart" />
                            </HeaderCartBadge>
                        </AntdBadge >
                    </HeaderCartBadgeWapper>
                </HeaderCartButtonWrapper>
                <HeaderCartDrawer
                    onDrawerClose={() => {
                        setStore({ [nameof<HeaderCartDrawerProps>(o => o.drawerVisible)]: false });
                    }}
                />
            </React.Fragment>

        );
    }
}