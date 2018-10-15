import * as React from 'react';
import { change } from 'redux-form';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdButton } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    createOrderForm,
    CreateOrderFormProps,
    CreateOrderFormValues
} from '@/forms/create-order/create-order-control';
import { Address } from '@/restful';

const CartAddressBookItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background: #F7F7F7;
    padding: 15px;
    > div:first-child {
        flex-grow: 1;
    }
`;

export interface CartAddressBookItemProps extends
    Pick<CommonStoreProps, 'cartAddressBookVisibleToggle'>,
    Pick<CommonStoreProps, 'dispatch'> {
    readonly address: Address;
}

@withStoreValues<CartAddressBookItemProps>('cartAddressBookVisibleToggle')
export class CartAddressBookItem extends React.PureComponent<CartAddressBookItemProps> {
    public render() {
        const { address } = this.props;
        return (
            <CartAddressBookItemWrapper>
                <div>
                    <strong>{address.name}</strong>
                    <p>
                        Địa chỉ: {address.fullAddress}, {address.county.name}, TP {address.city.name} <br />
                        Điện thoại: {address.phone}
                    </p>
                    <AntdButton onClick={this.onButtonClick} type="primary">Giao tới địa chỉ này</AntdButton>
                </div>
            </CartAddressBookItemWrapper>
        );
    }

    readonly onButtonClick = () => {
        const { cartAddressBookVisibleToggle, address, dispatch } = this.props;
        const changePhoneAction = change(
            createOrderForm,
            nameof.full<CreateOrderFormValues>(o => o.order.phone),
            address.phone
        );

        dispatch(changePhoneAction);

        const changeCityAction = change(
            createOrderForm,
            nameof.full<CreateOrderFormValues>(o => o.city_county),
            [String(address.city.id), String(address.county.id)]
        );
        dispatch(changeCityAction);

        const changeAddressAction = change(
            createOrderForm,
            nameof.full<CreateOrderFormValues>(o => o.order.shippingAddress),
            address.fullAddress
        );
        dispatch(changeAddressAction);

        cartAddressBookVisibleToggle();
    }
}
