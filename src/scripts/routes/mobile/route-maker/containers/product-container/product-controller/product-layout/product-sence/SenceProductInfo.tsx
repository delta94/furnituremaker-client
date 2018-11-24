import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { ThreeComponentListProps } from '@/components';
import { AntdButton } from '@/components/antd-component';
import { CommonStoreValues } from '@/configs';
import { formatCurrency } from '@/utilities';

const SenceProductInfoWrapper = styled.div`
    padding: 15px;
    background-color: #EFB416;
    margin-bottom: 15px;
    color: #fff;
`;

const Price = styled.span`
    font-weight: bold;
    line-height: normal;
    font-size: 20px;
    text-align: center;
    color: #FFF;
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
                <div>
                Giá sẽ thay đổi khi thay đổi cấu kiện và vật liệu
                </div>
                <Price> {formatCurrency(selectedProduct.totalPrice)}</Price>
                <AntdButton
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