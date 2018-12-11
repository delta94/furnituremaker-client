import * as React from 'react';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup, productTypeGroupUtils } from '@/restful';

import { DesignModalProps } from '../product-design-container';
import { ProductTypeListStoreProps } from '../product-type-container';
import { ProductTypeGroupList } from './type-group-controller';

interface TypeGroupControllerProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Pick<CommonStoreProps, 'leaveProductTypeGroupTimeout'>,
    Pick<CommonStoreProps, 'hoveredProductTypeGroup'>,
    ProductTypeListStoreProps {
    readonly productTypeGroups: ProductTypeGroup[];
}

@withStoreValues<TypeGroupControllerProps>('leaveProductTypeGroupTimeout')
export class TypeGroupController extends React.Component<TypeGroupControllerProps> {
    constructor(props: TypeGroupControllerProps) {
        super(props);
        const { productTypeGroups, setStore } = props;

        const defaulTypeGroup = productTypeGroupUtils.getDefaultProductTypeGroup(productTypeGroups);
        setStore<CommonStoreProps>({
            selectedProductTypeGroup: defaulTypeGroup,
            selectedProductType: defaulTypeGroup.productTypes[0]
        });
    }

    render() {
        const {
            leaveProductTypeGroupTimeout,
            productTypeGroups,
            setStore
        } = this.props;

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
                    if (leaveProductTypeGroupTimeout) {
                        clearTimeout(leaveProductTypeGroupTimeout);
                        setStore<TypeGroupControllerProps>({
                            leaveProductTypeGroupTimeout: null
                        });
                    }

                    setStore<TypeGroupControllerProps>({
                        hoveredProductTypeGroup: productTypeGroup,
                        showProductTypeList: true
                    });
                }}
                onProductTypeGroupLeave={() => {
                    const leaveTimeout = setTimeout(
                        () => {
                            setStore<CommonStoreProps>({
                                hoveredProductTypeGroup: null,
                            });
                        },
                        100
                    // tslint:disable-next-line:no-any
                    ) as any;

                    setStore<TypeGroupControllerProps>({
                        leaveProductTypeGroupTimeout: leaveTimeout,
                        showProductTypeList: false
                    });
                }}
            />
        );
    }
}