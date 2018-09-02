import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdBadge, AntdIcon, AntdPopover } from '@/components';
import { colorPrimary, CommonStoreProps } from '@/configs';
import {
    orderDetailUtils,
    restfulStore,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

const HeaderNotificationButtonWrapper = styled.div`
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

const HeaderNotificationBadgeWapper = styled.span`
    width: 40px;
    position: relative;
    transform: translateX(-50%);
    left: 50%;
`;

const HeaderNotificationBadge = styled.span`
    width: 25px;
    height: 20px;
    border-radius: 4px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
`;

type DefaultLayoutHeaderProps = CommonStoreProps & Partial<WithTempOrderDetails>;

@withTempOrderDetails(restfulStore)
@withStoreValues()
export class HeaderNotification extends React.Component<DefaultLayoutHeaderProps> {
    render() {
        const { orderDetails, setStore } = this.props;
        const quantity = orderDetailUtils.getQuantity(orderDetails);
        return (
            <AntdPopover
                title="Thông báo"
                content="Không có thông báo nào"
            >
                <HeaderNotificationButtonWrapper>
                    <HeaderNotificationBadgeWapper>
                        <AntdBadge
                            count={quantity}
                            showZero={true}
                            style={{ backgroundColor: '#52c41a' }}
                        >
                            <HeaderNotificationBadge>
                                <AntdIcon type="notification" />
                            </HeaderNotificationBadge>
                        </AntdBadge >
                    </HeaderNotificationBadgeWapper>
                </HeaderNotificationButtonWrapper>
            </AntdPopover>
        );
    }
}