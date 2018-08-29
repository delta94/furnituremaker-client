import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdIcon, AntdModal } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    furnitureComponentTypeUtils,
    restfulFetcher
} from '@/restful';

import {
    CreateComponentForm,
    CreateComponentFormValues
} from './create-component-form-control';

const AddComponentButton = styled.a`
    float: right;
`;

interface CreateComponentFormControlProps extends
    Pick<CommonStoreProps, 'dispatch'>,
    Pick<CommonStoreProps, 'selectedComponent'> {
}

export interface CreateComponentFormState {
    readonly modalVisibled: boolean;
}

@withStoreValues<CreateComponentFormControlProps>('selectedComponent')
export class CreateComponentFormControl extends React.Component<
CreateComponentFormControlProps,
CreateComponentFormState> {

    readonly onFormSubmit = async (formValues: CreateComponentFormValues) => {
        const { selectedComponent } = this.props;

        const newComponent: FurnitureComponent = {
            ...formValues,
            code: furnitureComponentTypeUtils.genCode(),
            componentType: selectedComponent.componentType,
            design: selectedComponent.design,
            materialTypes: selectedComponent.materialTypes
        };

        await restfulFetcher.fetchResource(
            furnitureComponentResources.create,
            [{
                type: 'body',
                value: newComponent
            }]
        );
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
                    />
                </AntdModal>
            </React.Fragment>
        );
    }
}