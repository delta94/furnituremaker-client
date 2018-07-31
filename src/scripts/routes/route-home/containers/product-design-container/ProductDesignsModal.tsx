import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { ProductDesign, productDesignGroupUtils } from '@/restful';
import { ProductDesignList, FullScreenModal } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesignGroupList } from '@/components';

const ModalContent = styled.div`
    background-color: '#fff';
    padding: 30px 0;
    width: 100%;
`;

export interface DesignModalProps extends CommonStoreProps {
    readonly showDesignsModal?: boolean;
    readonly productDesigns: ProductDesign[];
}

@withStoreValues(nameof<DesignModalProps>(o => o.showDesignsModal))
export class DesignModal extends React.Component<DesignModalProps> {
    render() {
        const { productDesigns, showDesignsModal, setStore } = this.props;
        const productDesignGroups = productDesignGroupUtils.fromDesigns(productDesigns);
        if (!productDesignGroups.length) {
            return null;
        }

        return (
            <FullScreenModal
                visibled={showDesignsModal}
                onClose={() => setStore({ [nameof<DesignModalProps>(o => o.showDesignsModal)]: false })}
            >
                <ModalContent>
                    <ProductDesignGroupList productDesignGroups={productDesignGroups} />
                    <ProductDesignList designs={productDesigns} />
                </ModalContent>
            </FullScreenModal>
        );
    }
}