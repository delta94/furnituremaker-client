import * as React from 'react';

import { withStoreValues } from '@/app';
import { ProductDesign, productDesignGroupUtils, restfulStore, productTypeGroupResourceType } from '@/restful';
import { CommonStoreProps } from '@/configs';
import { DesignModal, DesignModalProps } from './product-design-controllelr';

export {
    DesignModalProps
};

interface ProductDesignControllerProps extends CommonStoreProps {
    readonly productDesigns: ProductDesign[];
}

@withStoreValues(nameof<DesignModalProps>(o => o.showDesignsModal))
export class ProductDesignController extends React.Component<ProductDesignControllerProps> {
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
                onDesignClick={(productDesign: ProductDesign) => {
                    const productTypeGroupKey = productDesign.productType.productTypeGroup as string;
                    const productTypeGroup =
                        restfulStore.findRecordByKey(productTypeGroupResourceType, productTypeGroupKey);

                    setStore({
                        [nameof<CommonStoreProps>(o => o.selectedProductTypeGroup)]: productTypeGroup,
                        [nameof<CommonStoreProps>(o => o.selectedProductType)]: productDesign.productType,
                        [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: productDesign,
                        [nameof<DesignModalProps>(o => o.showDesignsModal)]: false
                    });
                }}
            />
        );
    }
}