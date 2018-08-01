// tslint:disable:no-string-literal
// tslint:disable:no-console

import './ThreeSence.scss';

import * as React from 'react';
import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';
import { ProductModule, uploadedFileUtils } from '@/restful';
import { WithStoreValuesDispatchs } from '@/app';

const { THREE } = window;

interface ThreeSenceProps extends ThreeSenceBaseProps, WithStoreValuesDispatchs {
    readonly productModules: ProductModule[];
    readonly selectedObject: THREE.Mesh;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    componentDidMount() {
        this.initSence();
        this.initContent();
    }

    componentDidUpdate() {
        this.selectObject(this.props.selectedObject);
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
        const { productModules } = this.props;
        for (const productModule of productModules) {
            if (!productModule.material || !productModule.component) {
                continue;
            }

            if (productModule.component.mtl) {
                const objLoader = new THREE.OBJLoader2();

                const callbackOnLoadObj = (event) => {
                    for (const child of event.detail.loaderRootNode.children) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.name = productModule.component.id;
                        // child.scale.set(0.1, 0.1, 0.1);
                        this.fadeIn(child);
                    }
                    this.scene.add(event.detail.loaderRootNode);
                };

                const onLoadMtl = (mtl) => {
                    const textureFile = uploadedFileUtils.getUrl(productModule.material.texture);
                    for (const materialInfoKey in mtl.materialsInfo) {
                        if (mtl.materialsInfo.hasOwnProperty(materialInfoKey)) {
                            const materialInfo = mtl.materialsInfo[materialInfoKey];

                            materialInfo.map_ka = textureFile;
                            materialInfo.map_kd = textureFile;
                        }
                    }
                    mtl.crossOrigin = '';
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
                    objLoader.setModelName(productModule.component.name);

                    const objFile = uploadedFileUtils.getUrl(productModule.component.obj);
                    objLoader.load(objFile, callbackOnLoadObj, null, null, null, false);
                };

                const mtlLoader = new THREE.MTLLoader();
                const mtlFile = uploadedFileUtils.getUrl(productModule.component.mtl);
                mtlLoader.load(mtlFile, onLoadMtl);
            } else if (productModule.component.fbx) {
                const callbackOnLoadFBX = (object) => {
                    for (const child of object.children) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.name = productModule.component.id;
                        this.fadeIn(child);
                    }
                    this.scene.add(object);
                };

                const fbxLoader = new THREE.FBXLoader();
                const fbxFile = uploadedFileUtils.getUrl(productModule.component.fbx);
                fbxLoader.load(fbxFile, callbackOnLoadFBX);
            }
        }
    }

    fadeIn(mesh: THREE.Mesh) {
        for (let key = 50; key <= 500; key += 50) {
            setTimeout(
                () => {
                    mesh.material['opacity'] = mesh.material['opacity'] + 0.1;
                },
                key
            );
        }
    }
}