import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { AddressBookFormControl } from '@/forms/address-book';
import {
    Address,
    addressBookResources,
    City,
    cityResources,
    restfulFetcher
} from '@/restful';

import { AddressBookList } from './address-book-container';

export interface AddressBookContainerProps {
}

export class AddressBookContainer extends React.PureComponent<AddressBookContainerProps> {
    readonly state: {
        readonly cities: City[];
        readonly addresses: Address[];
    };

    constructor(props: AddressBookContainerProps) {
        super(props);
        this.state = {
            addresses: [],
            cities: []
        };
    }

    async componentDidMount() {
        const [cities, addresses] = await Promise.all([
            restfulFetcher.fetchResource(cityResources.find),
            restfulFetcher.fetchResource(addressBookResources.find)
        ]);

        this.setState({
            cities: cities,
            addresses: addresses
        });
    }

    public render() {
        const { cities, addresses } = this.state;
        return (
            <React.Fragment>
                <AddressBookFormControl cities={cities} />
                <AddressBookList
                    cities={cities}
                    addresses={addresses}
                />
            </React.Fragment>
        );
    }
}
