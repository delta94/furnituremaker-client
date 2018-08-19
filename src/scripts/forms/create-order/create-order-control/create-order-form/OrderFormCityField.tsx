import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Field } from 'redux-form';

import {
    AntdSelectOptionProps,
    renderSelectField,
    required
} from '@/components';
import { City, cityResources, restfulFetcher, restfulStore } from '@/restful';

export interface OrderFormCityFieldProps {
    readonly fieldName: string;
    readonly onCityChange: (city: City) => void;
}

export class OrderFormCityField extends React.PureComponent<OrderFormCityFieldProps> {
    static readonly cityValidates = [required('Nhập tỉnh thành')];

    render() {
        const { fieldName, onCityChange } = this.props;
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={cityResources.find}
                parameters={[]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        const cities = renderProps.data;
                        const citiesMap: AntdSelectOptionProps[] = cities.map(o => ({ value: o.id, title: o.name }));

                        return (
                            <Field
                                name={fieldName}
                                component={renderSelectField}
                                onChange={(event, value: string) => {
                                    const selectedCity = cities.find(o => o.id === value);
                                    onCityChange(selectedCity);
                                }}
                                validate={OrderFormCityField.cityValidates}
                                required={true}
                                label="Tỉnh thành"
                                items={citiesMap}
                                selectProps={{
                                    placeholder: 'Chọn tỉnh thành'
                                }}
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }

}