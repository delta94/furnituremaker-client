import * as React from 'react';

import { withStoreValues } from '@/app';
import { ProductDesign, ProductDesignGroup } from '@/restful';
import { FullScreenModal, FullScreenModalProps } from '@/components';
import { CommonStoreProps } from '@/configs';

import { ProductDesignList, ProductDesignGroupList } from './product-designs-modal';

export interface DesignModalProps extends CommonStoreProps {
    readonly showDesignsModal?: boolean;
    readonly productDesigns: ProductDesign[];
    readonly productDesignGroups: ProductDesignGroup[];
    readonly onModalClose: FullScreenModalProps['onClose'];
    readonly onDesignClick: (productDesign: ProductDesign) => void;
}

@withStoreValues(nameof<DesignModalProps>(o => o.showDesignsModal))
export class DesignModal extends React.Component<DesignModalProps> {
    render() {
        const { productDesignGroups,
            productDesigns,
            showDesignsModal,
            onModalClose,
            onDesignClick
        } = this.props;
        return (
            <FullScreenModal
                visibled={showDesignsModal}
                onClose={onModalClose}
            >
                <ProductDesignGroupList productDesignGroups={productDesignGroups} />
                <ProductDesignList
                    designs={productDesigns}
                    onDesignClick={onDesignClick}
                />
            </FullScreenModal>
        );
    }
}