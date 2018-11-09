import * as React from 'react';
import { RestfulRender, RestfulRenderChildProps } from 'react-restful';
import { Field } from 'redux-form';

import { AntdCascaderOptionType, renderCascader, required } from '@/components';
import {
    City,
    cityResources,
    County,
    countyResources,
    restfulFetcher
} from '@/restful';

export interface OrderFormCityFieldProps {
    readonly initCity: City;
    readonly initCounty: County;

    readonly fieldName: string;
    readonly onCityChange: (city: City, county: County) => void;
}

export interface OrderFormCityFieldState {
    readonly cities: City[];
    readonly counties: County[];
    readonly options: AntdCascaderOptionType[];
}

export class OrderFormCityField extends React.PureComponent<OrderFormCityFieldProps, OrderFormCityFieldState> {
    static readonly cityValidates = [required('Nhập tỉnh thành')];

    constructor(props: OrderFormCityFieldProps) {
        super(props);
        const { initCity, initCounty, onCityChange } = this.props;
        this.state = {
            cities: [initCity],
            counties: [initCounty],
            options: [{
                value: initCity.id,
                label: initCity.name,
                children: [{
                    value: initCounty.id,
                    label: initCounty.name
                }]
            }]
        };

        onCityChange(initCity, initCounty);
    }

    readonly loadData = (selectedOptions: AntdCascaderOptionType[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        restfulFetcher.fetchResource(
            countyResources.find,
            [{
                parameter: 'city',
                type: 'query',
                value: targetOption.value
            }]
        ).then((counties) => {
            targetOption.loading = false;
            targetOption.children = counties.map(o => ({
                value: o.id,
                label: o.name
            }));

            this.setState({
                options: [...this.state.options],
            });
        });
    }

    readonly onFetchCompleted = (cities: City[]) => {
        if (!cities) {
            return;
        }
        const { initCity } = this.props;
        const { options } = this.state;

        this.setState({
            cities: cities,
            options: cities.map(o =>
                o.id === initCity.id ?
                    options[0] :
                    ({
                        value: o.id,
                        label: o.name,
                        isLeaf: false
                    })
            )
        });
    }

    readonly restFulRender = (renderProps: RestfulRenderChildProps<City[]>) => {
        const { fieldName, onCityChange } = this.props;
        const { cities, counties, options } = this.state;
        return (
            <Field
                name={fieldName}
                component={renderCascader}
                onChange={(event, value: string[]) => {
                    const targetCity = value[0];
                    const selectedCity = cities.find(o => o.id === targetCity);
                    const targetCounty = value[1];
                    const selectedCounty = counties.find(o => o.id === targetCounty);

                    onCityChange(selectedCity, selectedCounty);
                }}
                validate={OrderFormCityField.cityValidates}
                required={true}
                label="Tỉnh thành"
                cascaderProps={{
                    placeholder: 'Chọn tỉnh thành',
                    loadData: this.loadData,
                    options: options
                }}
            />
        );
    }

    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={cityResources.find}
                onFetchCompleted={this.onFetchCompleted}
                render={this.restFulRender}
            />
        );
    }
}