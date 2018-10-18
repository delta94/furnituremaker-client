import * as React from 'react';

import { Auth, withStoreValues } from '@/app';
import {
    AntdButton,
    AntdDivider,
    AntdMessage,
    AntdModal,
    fetchErrorHandler
} from '@/components';
import { CommonStoreProps } from '@/configs';
import { Address, addressBookResources, City, restfulFetcher } from '@/restful';

import {
    AddressBookForm,
    addressBookFormSubmit,
    AddressBookFormValues
} from './address-book-form-control';

export interface AddressBookFormControlProps
    extends Pick<CommonStoreProps, 'dispatch'> {
    readonly cities: City[];
    readonly address?: Address;
}

@withStoreValues<AddressBookFormControlProps>('dispatch')
export class AddressBookFormControl extends React.PureComponent<AddressBookFormControlProps> {
    readonly state: {
        readonly modalVisibled: boolean;
    };

    constructor(props: AddressBookFormControlProps) {
        super(props);
        this.state = {
            modalVisibled: false
        };
    }

    readonly toggleModalVisible = () => {
        this.setState({
            modalVisibled: !this.state.modalVisibled
        });
    }

    public render() {
        const { dispatch, cities, address } = this.props;
        const { modalVisibled } = this.state;

        const isUpdate = address !== undefined;

        return (
            <React.Fragment>
                <AntdButton
                    icon="plus"
                    onClick={this.toggleModalVisible}
                >
                    {isUpdate ? 'Cập nhật' : 'Thêm địa chỉ mới'}
                </AntdButton>
                <AntdModal
                    title={isUpdate ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                    visible={modalVisibled}
                    onOk={() => {
                        dispatch(addressBookFormSubmit);
                    }}
                    onCancel={this.toggleModalVisible}
                    destroyOnClose={true}
                >
                    <AddressBookForm
                        cities={cities}
                        initialValues={isUpdate ?
                            address :
                            {
                                user: Auth.instance.currentUser,
                                type: 'apartment'
                            }
                        }
                        onSubmit={isUpdate ? this.formUpdateSubmit : this.formCreateSubmit}
                    />
                </AntdModal>
                <AntdDivider type={isUpdate ? 'vertical' : 'horizontal'} />
            </React.Fragment>
        );
    }

    readonly formCreateSubmit = async (values: AddressBookFormValues) => {
        try {
            await restfulFetcher.fetchResource(
                addressBookResources.create,
                [{
                    type: 'body',
                    value: values
                }]
            );

            AntdMessage.success('Địa chỉ mới đã được tạo');
            this.toggleModalVisible();
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }

    readonly formUpdateSubmit = async (values: AddressBookFormValues) => {
        try {
            await restfulFetcher.fetchResource(
                addressBookResources.update,
                [{
                    type: 'path',
                    parameter: 'id',
                    value: values.id
                }, {
                    type: 'body',
                    value: values
                }]
            );

            AntdMessage.success('Địa chỉ được cập nhật');
            this.toggleModalVisible();
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }
}