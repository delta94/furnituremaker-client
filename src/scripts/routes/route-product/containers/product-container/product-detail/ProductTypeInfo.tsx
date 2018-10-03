import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';

const Wrapper = styled.div`
    padding: 30px 50px;
`;

const Lable = styled.label`
    line-height: normal;
    font-size: 18px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
    margin-bottom: 10px;
`;

const Property = styled.span`
    font-weight: bold;
    line-height: normal;
    font-size: 14px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
`;

const Value = styled.span`
    line-height: normal;
    font-size: 14px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
`;

export interface ProductTypeInfoProps extends
    Pick<CommonStoreProps, 'selectedProductType'> {
}

@withStoreValues<ProductTypeInfoProps>('selectedProductType')
export class ProductTypeInfo extends React.PureComponent<ProductTypeInfoProps> {
    public render() {
        return (
            <AntdRow>
                <AntdCol span={12}>
                    {this.renderSizeInfo()}
                </AntdCol>
                <AntdCol span={12}>
                    {this.renderDetail()}
                </AntdCol>
            </AntdRow>
        );
    }

    readonly renderSizeInfo = () => {
        return (
            <Wrapper>
                <Lable>Kích thước</Lable>
                <AntdRow>
                    <AntdCol span={18}>
                        <Property>Chiều cao</Property>
                    </AntdCol>
                    <AntdCol span={6}>
                        <Value>Chiều cao</Value>
                    </AntdCol>
                </AntdRow>
            </Wrapper>
        );
    }

    readonly renderDetail = () => {
        return null;
    }
}
