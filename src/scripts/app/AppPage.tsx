import * as React from 'react';

import { CommonStoreProps } from '@/configs';

export type AppPageProps = Pick<CommonStoreProps, 'setStore'>;

export class AppPage<P extends AppPageProps = AppPageProps, S= {}> extends React.PureComponent<P, S> {
    readonly resetAppState = () => {
        this.props.setStore<CommonStoreProps>({
            selectedComponent: null,
            selectedMaterialType: null,
            selectedProduct: null,
            selectedProductDesign: null,
            selectedProductDesignGroup: null,
            selectedProductType: null,
            selectedProductTypeGroup: null,
            selectedPromotion: null
        });
    }

    constructor(props: P) {
        super(props);
        this.resetAppState();
    }
}