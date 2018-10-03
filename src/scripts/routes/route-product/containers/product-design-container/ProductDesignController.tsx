import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductDesign, productDesignGroupUtils } from '@/restful';

import { DesignModal, DesignModalProps } from './product-design-controllelr';

export {
    DesignModalProps
};

interface ProductDesignControllerProps extends CommonStoreProps {
    readonly productDesigns: ProductDesign[];
}

@withStoreValues(nameof<DesignModalProps>(o => o.showDesignsModal))
export class ProductDesignController extends React.Component<ProductDesignControllerProps> {
    componentWillUnmount() {
        const { setStore } = this.props;
        setStore<DesignModalProps>({
            showDesignsModal: false
        });
    }
    
    render() {
        const { productDesigns, setStore } = this.props;
        const productDesignGroups = productDesignGroupUtils.fromDesigns(productDesigns);
        if (!productDesignGroups.length) {
            return null;
        }

        return (
            <DesignModal
                productDesigns={productDesigns}
                productDesignGroups={productDesignGroups}
                onModalClose={() => setStore({ [nameof<DesignModalProps>(o => o.showDesignsModal)]: false })}
            />
        );
    }
}