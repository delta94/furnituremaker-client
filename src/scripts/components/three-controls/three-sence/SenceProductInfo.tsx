import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { AntdButton } from '@/components/antd-component';
import { colorPrimary, CommonStoreValues } from '@/configs';
import { formatCurrency } from '@/utilities';

import { ThreeComponentListProps } from '../ThreeComponentList';

const SenceProductInfoWrapper = styled.div`
    max-width: 340px;
    margin: 0 auto;
    padding: 15px;
    text-align: center;
    background: #FCFCFC;
    margin-bottom: 15px;
`;

const Price = styled.span`
    font-weight: bold;
    line-height: normal;
    font-size: 32px;
    text-align: center;
    color: #EFB416;
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
`;

interface SenceProductInfoProps extends
    Pick<WithStoreValuesDispatchs, 'setStore'>,
    Pick<ThreeComponentListProps, 'selectedObject'>,
    Pick<CommonStoreValues, 'selectedProduct'> {
}

@withStoreValues<SenceProductInfoProps>(
    'selectedObject',
    'selectedProduct'
)
export class SenceProductInfo extends React.PureComponent<SenceProductInfoProps> {
    render() {
        const { selectedObject, selectedProduct, setStore } = this.props;
        if (!selectedObject) {
            return null;
        }

        return (
            <SenceProductInfoWrapper>
                <p>
                Giá sẽ thay đổi khi thay đổi cấu kiện và vật liệu
                </p>
                <Price> {formatCurrency(selectedProduct.totalPrice)}</Price>
                <AntdButton
                    size="large"
                    onClick={() => {
                        setStore({ selectedObject: null });
                    }}
                >
                    OK
                </AntdButton>
            </SenceProductInfoWrapper>
        );
    }
}