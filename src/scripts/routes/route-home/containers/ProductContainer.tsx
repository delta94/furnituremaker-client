import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreValues, CommonStoreProps } from '@/configs';
import {
    restfulStore,
    resfulFetcher,
    FurnitureComponent,
    furnitureComponentResources,
    WithMaterialTypesProps,
    withMaterialTypes
} from '@/restful';

import { ProductController } from './product-container';
import { PageLoadingProps } from '@/components';

type ProductContainerProps = CommonStoreProps & WithMaterialTypesProps;

@withMaterialTypes(restfulStore)
@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductDesign))
export class ProductContainer extends React.Component<ProductContainerProps> {

    constructor(props: ProductContainerProps) {
        super(props);
    }

    render() {
        const { materialTypes, selectedProductDesign } = this.props;
        if (!selectedProductDesign) {
            return null;
        }

        return (
            <RestfulRender
                store={restfulStore}
                fetcher={resfulFetcher}
                parameters={[{
                    type: 'query',
                    parameter: nameof<FurnitureComponent>(o => o.design),
                    value: selectedProductDesign.id
                }]}
                resource={furnitureComponentResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <ProductController
                                furnitureComponents={renderProps.data}
                                materialTypes={materialTypes}
                                selectedProductDesign={selectedProductDesign}
                            />
                        );
                    }
                    return null;
                }}
            />
        );
    }
}