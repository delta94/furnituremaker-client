import './ThreeMaterialList.scss';

import * as React from 'react';

import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    FurnitureMaterial,
    ProductExtended,
    uploadedFileUtils,
    WithMaterialProps
} from '@/restful';

import { ThreeSence } from './ThreeSence';

export interface ThreeMaterialListProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Required<Pick<CommonStoreProps, 'selectedProduct'>>,
    Required<Pick<CommonStoreProps, 'selectedMaterialType'>>,
    WithMaterialProps {
    readonly materials: FurnitureMaterial[];
    readonly selectedObject: THREE.Group;
    readonly selectedMaterial: FurnitureMaterial;
    readonly components: FurnitureComponent[];
}

export class ThreeMaterialListBase extends React.PureComponent<ThreeMaterialListProps> {
    readonly state: {
        readonly loading: boolean;
        readonly nextSelectMaterial: FurnitureMaterial;
    };

    constructor(props: ThreeMaterialListProps) {
        super(props);
        this.state = {
            loading: false,
            nextSelectMaterial: null
        };
    }

    readonly getMetarialTypes = () => {
        const { components, selectedObject } = this.props;
        const component = components.find(o => o.id === selectedObject.name);

        return component.materialTypes;
    }

    onMaterialSelect(material: FurnitureMaterial) {
        const { selectedObject, selectedProduct } = this.props;
        const texture = new window.THREE.TextureLoader();
        const textureFile = uploadedFileUtils.getUrl(material.texture);

        this.setState({
            loading: true,
            nextSelectMaterial: material
        });

        texture.load(textureFile, (map) => {
            const nextSelectedProduct = this.loadMaterial(map, material, selectedObject, selectedProduct);
            this.props.setStore<ThreeMaterialListProps>({
                selectedMaterial: material,
                selectedProduct: nextSelectedProduct
            });
            this.setState({
                loading: false
            });
        });
    }

    // tslint:disable-next-line:typedef
    loadMaterial(map, material, selectedObject, selectedProduct) {
        for (const mesh of selectedObject.children as THREE.Mesh[]) {
            const meshPhongMaterial = mesh.material as THREE.MeshPhongMaterial;
            meshPhongMaterial.map.image = map.image;
            meshPhongMaterial.map.needsUpdate = true;
            meshPhongMaterial.needsUpdate = true;
            if (material.view_normalMap) {
                ThreeSence.loadNormalMap(material, meshPhongMaterial);
            } else {
                meshPhongMaterial.normalMap = null;
            }
        }

        const nextSelectedProduct: ProductExtended = {
            ...selectedProduct,
            modules: selectedProduct.modules.map(productModule => {

                const nextMaterial = (selectedObject.name === productModule.component.id) ?
                    material : productModule.material;

                return {
                    ...productModule,
                    material: nextMaterial,
                    materialPrice: nextMaterial.price
                };
            })
        };

        return nextSelectedProduct;
    }
}