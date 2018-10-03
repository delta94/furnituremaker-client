import * as React from 'react';

import { withStoreValues } from '@/app';
import { FullScreenModal, FullScreenModalProps } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ProductDesign, ProductDesignGroup } from '@/restful';

import {
    ProductDesignGroupList,
    ProductDesignList
} from './product-designs-modal';

export interface DesignModalProps extends CommonStoreProps {
    readonly showDesignsModal?: boolean;
    readonly productDesigns: ProductDesign[];
    readonly productDesignGroups: ProductDesignGroup[];
    readonly onModalClose: FullScreenModalProps['onClose'];
}

@withStoreValues(nameof<DesignModalProps>(o => o.showDesignsModal))
export class DesignModal extends React.PureComponent<DesignModalProps> {
    render() {
        const { productDesignGroups,
            productDesigns,
            showDesignsModal,
            onModalClose
        } = this.props;
        return (
            <FullScreenModal
                visibled={showDesignsModal}
                onClose={onModalClose}
            >
                <ProductDesignGroupList productDesignGroups={productDesignGroups} />
                <ProductDesignList
                    designs={productDesigns}
                />
            </FullScreenModal>
        );
    }
}