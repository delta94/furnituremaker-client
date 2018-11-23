import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { addressBookResources, restfulFetcher } from '@/restful';

import { CartAddressBookList } from './cart-address-book-container';

export interface CartAddressBookContainerProps {
}

export class CartAddressBookContainer extends React.PureComponent<CartAddressBookContainerProps> {
    public render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={addressBookResources.find}
                render={(renderProps) => {
                    const { data } = renderProps;
                    if (!data) {
                        return null;
                    }

                    return <CartAddressBookList addresses={data} />;
                }}
            />
        );
    }
}
