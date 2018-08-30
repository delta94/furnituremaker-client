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
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
    border: 1px solid ${colorPrimary};
`;

const Price = styled.h3`
    font-weight: bold;
    color: ${colorPrimary};
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
                Giá sản phẩm: <Price> {formatCurrency(selectedProduct.totalPrice)}</Price>
                <div>
                    <AntdButton
                        type="primary"
                        onClick={() => {
                            setStore({ selectedObject: null });
                        }}
                    >
                        OK
                    </AntdButton>
                </div>
            </SenceProductInfoWrapper>
        );
    }
}