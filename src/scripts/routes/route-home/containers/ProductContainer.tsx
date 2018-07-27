import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { CommonStoreValues, CommonStoreProps } from '@/configs';
import {
    restfulStore,
    resfulFetcher,
    furnitureComponentResources,
    FurnitureComponent
} from '@/restful';

import { initComponents, avaliableComponents } from '../data';

import { ProductLayout } from './product-container';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductDesign))
export class ProductContainer extends React.Component<CommonStoreProps> {
    // tslint:disable-next-line:typedef
    constructor(props) {
        super(props);

        this.props.setStore({
            components: avaliableComponents,
            productPieces: initComponents.map(o => ({
                component: o,
                material: {
                    texture: '/static/models/sofa/maps/1701.jpg'
                }
            }))
        });
    }

    render() {
        const { selectedProductDesign } = this.props;
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
                    value: selectedProductDesign
                }]}
                resource={furnitureComponentResources.find}
                render={(renderProps) => {
                    return <ProductLayout />;
                }}
            />
        );
    }
}