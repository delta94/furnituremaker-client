import Radio from 'antd/lib/radio';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm, submit } from 'redux-form';

import {
    AntdCol,
    AntdRow,
    AntdSelectOptionProps,
    FormError,
    renderInput,
    renderRadioGroup,
    renderSelectField
} from '@/components';
import { Address, City, County } from '@/restful';

export interface AddressBookFormProps {
    readonly cities: City[];
}

export interface AddressBookFormValues extends Address {
}

type AddressBookFormComponentProps =
    AddressBookFormProps &
    InjectedFormProps<AddressBookFormValues, AddressBookFormProps>;

type AddressBookFormComponentState = {
    readonly citySelectItems: AntdSelectOptionProps[];
};

class AddressBookFormComponent extends React.Component<
    AddressBookFormComponentProps,
    AddressBookFormComponentState> {

    constructor(props: AddressBookFormComponentProps) {
        super(props);
        const { cities } = this.props;
        this.state = {
            citySelectItems: cities.map(o => ({
                value: o.id,
                title: o.name
            }))
        };
    }

    render() {
        const { handleSubmit, error, cities, change, initialValues } = this.props;

        const { city, county } = initialValues;

        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <AntdRow gutter={15}>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<AddressBookFormValues>(o => o.name)}
                            component={renderInput}
                            label="Tên"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập tên'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<AddressBookFormValues>(o => o.phone)}
                            component={renderInput}
                            label="Điện thoại"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập số điện thoại'
                            }}
                        />
                    </AntdCol>
                </AntdRow>
                <AntdRow gutter={15}>
                    <AntdCol span={12}>
                        <Field
                            name={nameof.full<AddressBookFormValues>(o => o.city.id)}
                            component={renderSelectField}
                            items={this.state.citySelectItems}
                            label="Thành phố"
                            required={true}
                            onChange={(e, value) => {
                                if (value) {
                                    const selectedCity = cities.find(o => o.id === value);
                                    change(nameof<AddressBookFormValues>(o => o.county), selectedCity.counties[0].id);
                                } else {
                                    change(nameof<AddressBookFormValues>(o => o.county), null);
                                }
                            }}
                            selectProps={{
                                placeholder: 'Chọn thành phố'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof.full<AddressBookFormValues>(o => o.city.id)}
                            component={this.renderCountiesField}
                        />
                    </AntdCol>
                </AntdRow>
                <Field
                    name={nameof<AddressBookFormValues>(o => o.fullAddress)}
                    component={renderInput}
                    label="Địa chỉ"
                    required={true}
                    inputProps={{
                        placeholder: 'Nhập địa chỉ'
                    }}
                />
                <Field
                    name={nameof.full<AddressBookFormValues>(o => o.type)}
                    component={renderRadioGroup}
                    label="Loại địa chỉ"
                    inputProps={{
                        children: [
                            <Radio key="apartment" value="apartment">Chung cư</Radio>,
                            <Radio key="home" value="home">Nhà riêng</Radio>
                        ]
                    }}
                />
            </Form>
        );
    }

    readonly renderCountiesField = (cityFieldProps) => {
        const { cities } = this.props;

        const { input } = cityFieldProps;

        const selectedCounties = input.value ?
            cities.find(o => o.id === input.value)!.counties : [];

        return (
            <Field
                name={nameof.full<AddressBookFormValues>(o => o.county.id)}
                component={renderSelectField}
                items={selectedCounties.map(o => ({
                    value: o.id,
                    title: o.name
                }))}
                label="Quận/huyện"
                required={true}
                selectProps={{
                    placeholder: 'Chọn quận/huyện'
                }}
            />
        );
    }
}

export const addressBookFormSubmit = submit('AddressBookForm');

export const AddressBookForm = reduxForm<AddressBookFormValues, AddressBookFormProps>({
    form: 'AddressBookForm'
})(AddressBookFormComponent);