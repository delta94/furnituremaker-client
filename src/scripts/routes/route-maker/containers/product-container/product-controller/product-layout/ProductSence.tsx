import autobind from 'autobind-decorator';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdAffix, ThreeSence } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    ProductExtended,
    restfulStore,
    uploadedFileUtils,
    withComponents,
    WithComponentsProps,
    WithMaterialProps,
    withMaterials
} from '@/restful';

const ProductSenceWrapper = styled.div`
    padding: 60px 0 0 0;
`;

interface RouteHomeProps extends
    CommonStoreProps,
    WithComponentsProps,
    WithMaterialProps {
    readonly selectedObject?: THREE.Group | null;
    readonly product: ProductExtended;
}
@withComponents(restfulStore)
@withMaterials(restfulStore)
@withStoreValues(
    nameof<RouteHomeProps>(o => o.selectedObject),
    nameof<RouteHomeProps>(o => o.selectedProduct),
)
export class ProductSence extends React.PureComponent<RouteHomeProps> {
    render() {
        const { setStore, selectedProduct } = this.props;
        return (
            <AntdAffix offsetTop={10}>
                <ProductSenceWrapper>
                    <ThreeSence
                        onObjectSelect={this.onObjectSelect}
                        selectedObject={this.props.selectedObject}
                        productModules={this.props.product.modules}
                        productType={selectedProduct.productType}
                        setSence={(threeScreen) => {
                            setStore({
                                [nameof<CommonStoreProps>(o => o.product3Dsence)]: threeScreen
                            });
                        }}
                    />
                </ProductSenceWrapper>
            </AntdAffix>
        );
    }

    @autobind
    onObjectSelect(object: THREE.Group) {
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
        const sameTypeComponents = components.filter(o => {
            if (!o.componentType) {
                return false;
            }

            return o.componentType.id === componentData.componentType.id;
        });

        const child = object.children[0] as THREE.Mesh;
        const objectMaterial = child.material as THREE.MeshPhongMaterial | THREE.MeshPhongMaterial[];

        const selectedMaterial = materials.find(material => {
            if (Array.isArray(objectMaterial)) {
                return uploadedFileUtils.getUrl(material.texture) === objectMaterial[0].map.image.src;
            }
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