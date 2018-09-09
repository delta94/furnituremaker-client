import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdAffix, Img } from '@/components';
import { CommonStoreProps } from '@/configs';

import { InventoryProductSence } from './inventory-prodyct-preview';

const InventoryProductPreviewWrapper = styled.div`
    padding: 60px 0 0 0;
`;

export interface InventoryProductPreviewProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProduct'> {
}

@withStoreValues<InventoryProductPreviewProps>(
    'selectedProduct'
)
export class InventoryProductPreview extends React.PureComponent<InventoryProductPreviewProps> {

    public render() {
        const { selectedProduct } = this.props;

        return (
            <AntdAffix>
                <InventoryProductPreviewWrapper>
                    {
                        selectedProduct.modulesCode ?
                            <InventoryProductSence product={selectedProduct} />
                            : (
                                <div style={{ textAlign: 'center' }}>
                                    <Img file={selectedProduct.thumbnail} />
                                </div>
                            )
                    }
                </InventoryProductPreviewWrapper>
            </AntdAffix>
        );
    }
}
