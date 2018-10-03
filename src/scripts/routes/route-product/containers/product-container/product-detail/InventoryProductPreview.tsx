import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { Img } from '@/components';
import { CommonStoreProps } from '@/configs';

import { InventoryProductSence } from './inventory-prodyct-preview';

const InventoryProductPreviewWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export interface InventoryProductPreviewProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'selectedProduct'> {
}

@withStoreValues<InventoryProductPreviewProps>(
    'selectedProduct'
)
export class InventoryProductPreview extends React.PureComponent<InventoryProductPreviewProps> {
    // tslint:disable-next-line:readonly-keyword
    wrapper: React.RefObject<{}> = React.createRef();
    componentDidMount() {
        const wrapper = window.document.getElementById('wrapper');

    }
    public render() {
        const { selectedProduct } = this.props;

        return (
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
        );
    }
}