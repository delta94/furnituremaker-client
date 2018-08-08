import * as React from 'react';
import autobind from 'autobind-decorator';

import { ThreeSence } from '@/components';
import {
    Product,
    withComponents,
    restfulStore,
    WithComponentsProps,
    WithMaterialProps,
    uploadedFileUtils,
    withMaterials
} from '@/restful';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

interface RouteHomeProps extends
    CommonStoreProps,
    WithComponentsProps,
    WithMaterialProps {
    readonly selectedObject?: THREE.Mesh | null;
    readonly product: Product;
}
@withComponents(restfulStore)
@withMaterials(restfulStore)
@withStoreValues(nameof<RouteHomeProps>(o => o.selectedObject))
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
                selectedMaterial: null
            });
        }

        const { components, materials } = this.props;

        const componentData = components.find(o => o.id === object.name);
        const sameTypeComponents = components.filter(o => o.componentType.id === componentData.componentType.id);

        const objectMaterial = object.material as THREE.MeshPhongMaterial;
        
        const selectedMaterial = materials.find(material => {
            return uploadedFileUtils.getUrl(material.texture) === objectMaterial.map.image.src;
        });

        return this.props.setStore({
            materials: [],
            selectedObject: object,
            selectedMaterial: selectedMaterial,
            components: sameTypeComponents,
            selectedMaterialType: componentData.materialTypes[0]
        });
    }
}