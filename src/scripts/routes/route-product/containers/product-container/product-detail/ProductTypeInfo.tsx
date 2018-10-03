import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCol, AntdRow } from '@/components';
import { CommonStoreProps } from '@/configs';

const Wrapper = styled.div`
    padding: 20px 40px;
`;

const Lable = styled.label`
    line-height: normal;
    font-size: 18px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
    margin-bottom: 15px;
    display: block;
`;

const Property = styled.span`
    font-weight: bold;
    line-height: normal;
    font-size: 14px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
    line-height: 30px;
`;

const Value = styled.span`
    line-height: normal;
    font-size: 14px;
    letter-spacing: -0.00357498px;
    color: #3D3D3D;
    line-height: 30px;
`;

export interface ProductTypeInfoProps extends
    Pick<CommonStoreProps, 'selectedProductType'>,
    Pick<CommonStoreProps, 'selectedProductDesign'> {
}

@withStoreValues<ProductTypeInfoProps>('selectedProductType', 'selectedProductDesign')
export class ProductTypeInfo extends React.PureComponent<ProductTypeInfoProps> {
    public render() {
        return (
            <AntdRow type="flex" style={{ marginBottom: 15 }}>
                <AntdCol span={12} style={{ borderRight: '1px solid lightgray' }}>
                    {this.renderSizeInfo()}
                </AntdCol>
                <AntdCol span={12}>
                    {this.renderDetail()}
                </AntdCol>
            </AntdRow>
        );
    }

    readonly renderSizeInfo = () => {
        const { selectedProductType } = this.props;

        const {
            sizeDepth,
            crs,
            hwd,
            sizeHeight,
            sizeHeightFoot,
            sizeHeightHand,
            sizeWeight
        } = selectedProductType;

        return (
            <Wrapper>
                <Lable>Kích thước</Lable>
                {this.renderRow('Chiều cao', sizeHeight, 'mm')}
                {this.renderRow('Chiều rộng', sizeWeight, 'mm')}
                {this.renderRow('Chiều sâu', sizeDepth, 'mm')}
                {this.renderRow('Chiều cao tay', sizeHeightHand, 'mm')}
                {this.renderRow('kích thước mặt ngồi (HWD)', hwd)}
                {this.renderRow('Chiều cao chân', sizeHeightFoot, 'mm')}
                {this.renderRow('Kích thước bao bì', crs)}
            </Wrapper>
        );
    }

    readonly renderDetail = () => {
        const { selectedProductType } = this.props;

        const {
            weight,
            caringInstruction,
            chairCoverType,
            foamType,
            mattressMaterial,
            wrappedMaterial
        } = selectedProductType;

        return (
            <Wrapper>
                <Lable>Kích thước</Lable>
                {this.renderRow('Trọng lượng', weight, 'kg')}
                {this.renderRow('Loại vỏ ghế', chairCoverType)}
                {this.renderRow('vật liệu bọc', mattressMaterial)}
                {this.renderRow('vật liệu nệm', wrappedMaterial)}
                {this.renderRow('Loại foam', foamType)}
                {this.renderRow('Caring instruction', caringInstruction)}
            </Wrapper>
        );
    }

    readonly renderRow = (label: string, value, suffix?) => {
        return (
            <AntdRow>
                <AntdCol span={18}>
                    <Property>{label}</Property>
                </AntdCol>
                <AntdCol span={6}>
                    <Value>{`${value} ${suffix}`}</Value>
                </AntdCol>
            </AntdRow>
        );
    }
}
