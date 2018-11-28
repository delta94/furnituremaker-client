import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdSelect } from '@/components/antd-component';
import { CommonStoreProps } from '@/configs';
import {
    MaterialType,
    withMaterialTypes,
    WithMaterialTypesProps
} from '@/restful';

const MaterialTypeSelectWrapper = styled.div`
    width: 150px;
    .ant-select {
        width: 100%;
    }
`;

export interface MaterialTypeSelectProps extends
    WithMaterialTypesProps,
    Pick<CommonStoreProps, 'setStore'> {
    readonly selectedMaterialType: MaterialType;
}

@withStoreValues<CommonStoreProps>()
export class MaterialTypeSelect extends React.PureComponent<MaterialTypeSelectProps> {
    public render() {
        const { materialTypes, selectedMaterialType, setStore } = this.props;
        if (!selectedMaterialType) {
            return null;
        }
        
        if (materialTypes.length === 1) {
            return null;
        }
        return (
            <MaterialTypeSelectWrapper>
                <AntdSelect
                    value={selectedMaterialType.id}
                    onChange={(value) => {
                        setStore({
                            selectedMaterialType: materialTypes.find(o => o.id === value)
                        });
                    }}
                >
                    {materialTypes.map(o =>
                        <AntdSelect.Option key={o.id} value={o.id}>{o.name}</AntdSelect.Option>
                    )}
                </AntdSelect>
            </MaterialTypeSelectWrapper>
        );
    }
}
