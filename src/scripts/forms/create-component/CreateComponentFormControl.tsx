import * as moment from 'moment';
import * as React from 'react';
import { submit } from 'redux-form';
import styled from 'styled-components';

import { AntdIcon, AntdModal } from '@/components';
import { CommonStoreProps } from '@/configs';
import { Order, orderResources, restfulFetcher } from '@/restful';

import {
    CreateComponentForm,
    CreateComponentFormValues
} from './create-component-form-control';

const AddComponentButton = styled.a`
    float: right;
`;

interface CreateComponentFormControlProps extends
    Pick<CommonStoreProps, 'dispatch'> {
}

export interface CreateComponentFormState {
    readonly modalVisibled: boolean;
}

export class CreateComponentFormControl extends React.Component<
    CreateComponentFormControlProps,
    CreateComponentFormState> {

    readonly submit = async () => {
        const { dispatch } = this.props;
        const submitFormAction = submit('UpdateOrder');
        dispatch(submitFormAction);
    }

    readonly onFormSubmit = async (formValues: CreateComponentFormValues) => {
        //
    }

    constructor(props: CreateComponentFormControlProps) {
        super(props);
        this.state = {
            modalVisibled: false
        };
    }

    render() {
        const { modalVisibled } = this.state;

        return (
            <React.Fragment>
                <AddComponentButton
                    onClick={() => {
                        this.setState({
                            modalVisibled: true
                        });
                    }}
                >
                    <AntdIcon type="plus" /> Thêm
                </AddComponentButton>
                <AntdModal
                    title="Thêm cấu kiện"
                    visible={modalVisibled}
                    onCancel={() => this.setState({ modalVisibled: false })}
                >
                    <CreateComponentForm
                        onSubmit={this.onFormSubmit}
                        initialValues={{
                        }}
                    />
                </AntdModal>
            </React.Fragment>
        );
    }
}