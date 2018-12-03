import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdSelect } from '@/components';
import { CommonStoreProps } from '@/configs';
import { withMaterialTypes, WithMaterialTypesProps } from '@/restful';

const MetarialTypeSelectWrapper = styled.div`
    display: block;
    .ant-select {
        min-width: 200px;
    }

    margin-bottom: 24px;
`;

export interface MetarialTypeSelectProps extends
    WithMaterialTypesProps,
    Pick<CommonStoreProps, 'setStore'> {
}

@withStoreValues()
@withMaterialTypes()
export class MetarialTypeSelect extends React.PureComponent<MetarialTypeSelectProps> {
    public render() {
        const { materialTypes, setStore } = this.props;
        return (
            <MetarialTypeSelectWrapper>
                <AntdSelect
                    placeholder="Chọn loại vật liệu"
                    onSelect={(value) =>
                        setStore<CommonStoreProps>({ selectedMaterialType: materialTypes.find(o => o.id === value) })
                    }
                >
                    {materialTypes.map(o => {
                        return (
                            <AntdSelect.Option key={o.id} value={o.id}>
                                {o.name}
                            </AntdSelect.Option>
                        );
                    })}
                </AntdSelect>
            </MetarialTypeSelectWrapper>
        );
    }
}
