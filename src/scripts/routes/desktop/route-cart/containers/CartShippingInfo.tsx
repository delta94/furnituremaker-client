import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdButton, AntdCard, AntdDivider, AntdModal } from '@/components';
import {
    CommonStoreProps,
    CommonStoreValues,
    InitAppStoreProps
} from '@/configs';
import { CreateOrderControl } from '@/forms/create-order';
import {
    Order,
    orderUtils,
    withTempOrderDetails,
    WithTempOrderDetails
} from '@/restful';

import { CartAddressBookContainer } from './cart-payment-info';

const CartShippingInfoWrapper = styled.div`
    .ant-card-head {
        background: #D6D6D6;
        text-align: center;
    }
    .ant-card-body {
        padding-left: 0!important;
        padding-right: 0!important;
    }
    .ant-card-head-title {
        justify-content: center;
    }
`;

interface CartDrawerFooterProps extends
    WithTempOrderDetails,
    Pick<CommonStoreProps, 'setStore'>,
    Pick<InitAppStoreProps, 'history'>,
    Pick<CommonStoreProps, 'cartAddressBookVisibleToggle'> {
}

@withTempOrderDetails
@withStoreValues<InitAppStoreProps>('history')
export class CartShippingInfo extends React.Component<CartDrawerFooterProps> {
    readonly state: { readonly addressBookVisible?: boolean } = {};

    componentDidMount() {
        const { setStore } = this.props;
        setStore({
            cartAddressBookVisibleToggle: this.toggleAddressBook
        });
    }

    readonly toggleAddressBook = () => this.setState({
        addressBookVisible: !this.state.addressBookVisible
    })

    render() {
        const { orderDetails } = this.props;
        const { addressBookVisible } = this.state;
        return (
            <CartShippingInfoWrapper>
                <AntdCard bordered={false} title="THÔNG TIN GIAO HÀNG">
                    <div>
                        <AntdButton onClick={this.toggleAddressBook} icon="book">Chọn từ sổ địa chỉ</AntdButton>
                        <AntdDivider dashed={true} />
                        <CreateOrderControl
                            part="shiping-info"
                            orderDetails={orderDetails}
                        />
                    </div>
                </AntdCard>
                <AntdModal
                    title="Sổ địa chỉ của bạn"
                    visible={addressBookVisible}
                    onOk={this.toggleAddressBook}
                    onCancel={this.toggleAddressBook}
                >
                    <CartAddressBookContainer />
                </AntdModal>
            </CartShippingInfoWrapper>
        );
    }

    readonly onOpenAddressBook = () => {
        // ..
    }
}