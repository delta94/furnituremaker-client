import * as React from 'react';
import styled from 'styled-components';

import { Address } from '@/restful';

import { CartAddressBookItem } from './cart-address-book-item';

const CartAddressBookListWrapper = styled.div`
    display: block;
    > *:not(:last-child) {
        margin-bottom: 15px;
    }
`;
export interface CartAddressBookListProps {
    readonly addresses: Address[];
}

export class CartAddressBookList extends React.PureComponent<CartAddressBookListProps> {
    public render() {
        const { addresses } = this.props;
        return (
            <CartAddressBookListWrapper>
                {addresses.map(o => <CartAddressBookItem key={o.id} address={o} />)}
            </CartAddressBookListWrapper>
        );
    }
}
