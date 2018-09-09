import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup, productTypeGroupUtils } from '@/restful';

import { DesignModalProps } from '../product-design-container';
import { ProductTypeListStoreProps } from '../product-type-container';
import { ProductTypeGroupList } from './type-group-controller';

interface TypeGroupControllerProps extends CommonStoreProps {
    readonly productTypeGroups: ProductTypeGroup[];
}

@withStoreValues()
export class TypeGroupController extends React.Component<TypeGroupControllerProps> {
    constructor(props: TypeGroupControllerProps) {
        super(props);
        const { productTypeGroups, setStore, checkStore } = props;

        const defaulTypeGroup = productTypeGroupUtils.getDefaultProductTypeGroup(productTypeGroups);
        setStore<CommonStoreProps>({
            selectedProductTypeGroup: defaulTypeGroup,
            selectedProductType: defaulTypeGroup.productTypes[0]
        });
    }

    render() {
        const { productTypeGroups, setStore } = this.props;

        return (
            <ProductTypeGroupList
                productTypeGroups={productTypeGroups}
                onProductTypeGroupClick={(productTypeGroup) => {
                    if (productTypeGroup.productTypes.length !== 1) {
                        return;
                    }
                    const productTypeWillClick = productTypeGroup.productTypes[0];
                    setStore({
                        [nameof<DesignModalProps>(o => o.showDesignsModal)]: true,
                        [nameof<CommonStoreProps>(o => o.selectedProductType)]: productTypeWillClick
                    });
                }}
                onProductTypeGroupHover={(productTypeGroup: ProductTypeGroup) => {
                    const onlyATypeInGroup = (productTypeGroup.productTypes.length <= 1);
                    if (onlyATypeInGroup) {
                        return;
                    }

                    setStore({
                        [nameof<CommonStoreProps>(o => o.hoveredProductTypeGroup)]: productTypeGroup,
                        [nameof<ProductTypeListStoreProps>(o => o.showProductTypeList)]: true
                    });
                }}
                onProductTypeGroupLeave={() => {
                    setStore({
                        [nameof<ProductTypeListStoreProps>(o => o.showProductTypeList)]: false
                    });
                }}
            />
        );
    }
}