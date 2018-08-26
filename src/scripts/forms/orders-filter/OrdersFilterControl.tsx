import * as React from 'react';

import { withStoreValues } from '@/app';
import { InitAppStoreProps } from '@/configs';
import { objectToSearchParams, searchParamsObject } from '@/utilities';

import {
    OrderFilterForm,
    OrderFilterFormValues
} from './orders-filter-control';

@withStoreValues<InitAppStoreProps>('history')
export class OrdersFilterControl extends React.PureComponent<InitAppStoreProps> {
    render() {
        const { history } = this.props;
        const initialValues = searchParamsObject<OrderFilterFormValues>();
        return (
            <OrderFilterForm
                onSubmit={(values: OrderFilterFormValues) => {
                    const newSearch = objectToSearchParams(values);
                    history.push(`?${newSearch.toString()}`);
                }}
                initialValues={initialValues}
            />
        );
    }
}