import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreProps, CommonStoreValues } from '@/configs';
import {
    FurnitureComponent,
    furnitureComponentResources,
    restfulFetcher,
    restfulStore,
    withMaterialTypes,
    WithMaterialTypesProps
} from '@/restful';

import { NoProductData, ProductController } from './product-container';

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
                fetcher={restfulFetcher}
                parameters={[{
                    type: 'query',
                    parameter: nameof<FurnitureComponent>(o => o.design),
                    value: selectedProductDesign.id
                }]}
                resource={furnitureComponentResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        if (!renderProps.data.length) {
                            return <NoProductData />;
                        }

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
