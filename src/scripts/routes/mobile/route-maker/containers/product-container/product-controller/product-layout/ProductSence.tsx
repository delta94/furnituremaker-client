import * as React from 'react';
import * as Sticky from 'sticky-js';

import { withStoreValues } from '@/app';
import { ThreeMaterialListProps, ThreeSence } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    ProductExtended,
    uploadedFileUtils,
    withComponents,
    WithComponentsProps,
    WithMaterialProps,
    withMaterials
} from '@/restful';

interface ProductSenceProps extends
    CommonStoreProps,
    WithComponentsProps,
    WithMaterialProps,
    Partial<Pick<ThreeMaterialListProps, 'selectedMaterial'>> {
    readonly selectedObject?: THREE.Group | null;
    readonly product: ProductExtended;
}

@withComponents()
@withMaterials()
@withStoreValues(
    nameof<ProductSenceProps>(o => o.selectedObject),
    nameof<ProductSenceProps>(o => o.selectedProduct),
)
export class ProductSence extends React.PureComponent<ProductSenceProps> {
    // tslint:disable-next-line:readonly-keyword
    sticky: Sticky;

    readonly state: {
        readonly affix: boolean;
        readonly staticTop: number;
    } = {
            affix: true,
            staticTop: 0
        };

    componentDidMount() {
        this.sticky = new Sticky('.sticky');
    }

    render() {
        const { setStore, selectedProduct, selectedObject, product } = this.props;
        return (
            <div style={{ height: '100%' }} data-sticky-container={true}>
                <div className="sticky">
                    <div style={{ paddingTop: 120 }}>
                        <ThreeSence
                            onObjectSelect={this.onObjectSelect}
                            selectedObject={selectedObject}
                            productModules={product.modules}
                            productType={selectedProduct.productType}
                            setSence={(threeScreen) => {
                                setStore({
                                    [nameof<CommonStoreProps>(o => o.product3Dsence)]: threeScreen
                                });
                            }}
                        />
                    </div>

                </div>
            </div>
        );
    }

    readonly onObjectSelect = (object: THREE.Group) => {
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
        const selectedComponent = components.find(o => o.id === object.name);

        return this.props.setStore<ProductSenceProps>({
            materials: [],
            selectedObject: object,
            selectedMaterial: selectedMaterial,
            components: sameTypeComponents,
            allComponents: components,
            selectedMaterialType: componentData.materialTypes[0],
            selectedComponent: selectedComponent
        });
    }
}