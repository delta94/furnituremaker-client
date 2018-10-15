import * as React from 'react';
import styled from 'styled-components';

import { AntdButton, AntdDivider } from '@/components';
import { AddressBookFormControl } from '@/forms/address-book';
import { Address, addressBookResources, City, restfulFetcher } from '@/restful';

const AddressBookItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > div:first-child {
        flex-grow: 1;
    }
`;

export interface AddressBookItemProps {
    readonly address: Address;
    readonly cities: City[];
}

export class AddressBookItem extends React.PureComponent<AddressBookItemProps> {
    public render() {
        const { address, cities } = this.props;
        return (
            <AddressBookItemWrapper>
                <div>
                    <strong>{address.name}</strong>
                    <p>
                        Địa chỉ: {address.fullAddress}, {address.county.name}, TP {address.city.name} <br />
                        Điện thoại: {address.phone}
                    </p>
                </div>
                <div>
                    <AddressBookFormControl cities={cities} address={address} />
                </div>
                <div>
                    <AntdButton
                        onClick={(o => {
                            restfulFetcher.fetchResource(
                                addressBookResources.delete, {
                                    type: 'path',
                                    parameter: 'id',
                                    value: address.id
                                }
                            );
                        })}
                        type="danger"
                    >
                        Xóa
                    </AntdButton>
                </div>
            </AddressBookItemWrapper>
        );
    }
}
