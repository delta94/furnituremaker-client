import * as React from 'react';
import autobind from 'autobind-decorator';

import { ThreeSence } from '@/components';
import { Product, withComponents, restfulStore, WithComponentsProps } from '@/restful';
import { withStoreValues, WithStoreValuesDispatchs } from '@/app';

interface RouteHomeProps extends WithStoreValuesDispatchs, WithComponentsProps {
    readonly selectedObject?: THREE.Mesh | null;
    readonly product: Product;
}

@withComponents(restfulStore)
@withStoreValues('selectedObject')
export class ProductSence extends React.PureComponent<RouteHomeProps> {
    render() {
        return (
            <ThreeSence
                onObjectSelect={this.onObjectSelect}
                selectedObject={this.props.selectedObject}
                productModules={this.props.product.modules}
            />
        );
    }

    @autobind
    onObjectSelect(object: THREE.Mesh | null) {
        if (!object) {
            return this.props.setStore({
                materials: [],
                components: [],
                selectedObject: object,
                selectedTexture: null
            });
        }

        const { components } = this.props;

        const componentData = components.find(o => o.id === object.name);
        const sameTypeComponents = components.filter(o => o.componentType.id === componentData.componentType.id);

        const material = object.material as THREE.MeshPhongMaterial;
        const currentTexturePathWithOrigin = material.map.image.src;
        return this.props.setStore({
            materials: [],
            selectedObject: object,
            selectedTexture: currentTexturePathWithOrigin.replace(location.origin, ''),
            components: sameTypeComponents,
            selectedMaterialType: componentData.materialType
        });
    }
}