import * as React from 'react';
import styled from 'styled-components';

import { City, withAddressBook, WithAddressBookProps } from '@/restful';

import { AddressBookItem } from './address-book-list';

const AddressBookListWrapper = styled.div`
    display: block;
    > *:not(:last-child) {
        border-bottom: 1px solid lightgray;
        margin-bottom: 15px;
    }
`;

export interface AddressBookListProps extends WithAddressBookProps {
    readonly cities: City[];
}

@withAddressBook()
export class AddressBookList extends React.PureComponent<AddressBookListProps> {
    public render() {
        const { addresses, cities } = this.props;
        return (
            <AddressBookListWrapper>
                {addresses.map(o => <AddressBookItem key={o.id} cities={cities} address={o} />)}
            </AddressBookListWrapper>
        );
    }
}
