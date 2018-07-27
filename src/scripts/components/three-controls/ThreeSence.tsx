// tslint:disable:no-string-literal
// tslint:disable:no-console

import './ThreeSence.scss';

import * as React from 'react';
import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';
import { FurnitureComponent, FurnutureMaterial } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';

const { THREE } = window;

interface ProductPiece {
    component: FurnitureComponent;
    material: FurnutureMaterial;
}

interface ThreeSenceProps extends ThreeSenceBaseProps, WithStoreValuesProps {
    productPieces?: ProductPiece[];
    selectedObject?: THREE.Mesh;
}

@withStoreValues('selectedObject', 'productPieces')
export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    componentDidMount() {
        this.initSence();
        this.initContent();
    }

    componentDidUpdate() {
        this.selectObject(this.props.selectedObject);
        this.props.setStore({
            sence: this.scene
        });
    }

    componentWillUnmount() {
        if (this.animationFrameId) {
            this.clearScene();
        }
    }

    render() {
        return (<div id="threeViewWindow" ref={(element) => this.container = element} />);
    }

    initContent() {
        const { productPieces } = this.props;
        for (const piece of productPieces) {
            const objLoader = new THREE.OBJLoader2();

            // tslint:disable-next-line:typedef
            const callbackOnLoad = (event) => {
                for (const mesh of event.detail.loaderRootNode.children) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.name = piece.component.id;
                    mesh.scale.set(0.1, 0.1, 0.1);
                    this.fadeIn(mesh);
                }
                this.scene.add(event.detail.loaderRootNode);
            };

            // tslint:disable-next-line:typedef
            const onLoadMtl = (mtl) => {
                const texture = new THREE.TextureLoader();
                texture.load(piece.material.texture, (map) => {
                    for (const materialInfoKey in mtl.materialsInfo) {
                        if (mtl.materialsInfo.hasOwnProperty(materialInfoKey)) {
                            const materialInfo = mtl.materialsInfo[materialInfoKey];

                            materialInfo.map_ka = piece.material.texture;
                            materialInfo.map_kd = piece.material.texture;
                        }
                    }

                    mtl.preload();
                    const materials = mtl.materials;

                    for (const key in materials) {
                        if (materials.hasOwnProperty(key)) {
                            const material = materials[key];
                            material.transparent = true;
                            material.opacity = 0;
                            if (material['map']) {
                                material['map'].anisotropy = 16;
                                material['shininess'] = 0;
                            }
                        }
                    }
                    objLoader.setLogging(false, false);
                    objLoader.setMaterials(materials);
                    objLoader.setModelName(piece.component.name);
                    objLoader.load(piece.component.obj, callbackOnLoad, null, null, null, false);
                });
            };

            const mtlLoader = new THREE.MTLLoader();
            mtlLoader.load(piece.component.mtl, onLoadMtl);
        }
    }

    fadeIn(mesh: THREE.Mesh) {
        for (let key = 50; key <= 500; key += 50) {
            setTimeout(() => {
                mesh.material['opacity'] = mesh.material['opacity'] + 0.1;
                // tslint:disable-next-line:align
            }, key);
        }
    }
}