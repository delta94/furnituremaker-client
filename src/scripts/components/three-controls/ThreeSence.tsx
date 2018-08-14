// tslint:disable:no-string-literal
// tslint:disable:no-console
import './ThreeSence.scss';

import autobind from 'autobind-decorator';
import * as React from 'react';

import { WithStoreValuesDispatchs } from '@/app';
import { ProductModule, uploadedFileUtils } from '@/restful';

import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';

const { THREE } = window;

interface ThreeSenceProps extends ThreeSenceBaseProps, WithStoreValuesDispatchs {
    readonly productModules: ProductModule[];
    readonly selectedObject: THREE.Mesh;
    readonly setSence: (threeSence: ThreeSence) => void;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    componentDidMount() {
        this.initSence();
        this.initContent();
        this.props.setSence(this);
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
                const onLoadMtl = (mtl: THREE.MaterialCreator) => {
                    const textureFile = uploadedFileUtils.getUrl(productModule.material.texture);
                    for (const materialInfoKey in mtl.materialsInfo) {
                        if (mtl.materialsInfo.hasOwnProperty(materialInfoKey)) {
                            const materialInfo = mtl.materialsInfo[materialInfoKey];

                            materialInfo.map_ka = textureFile;
                            materialInfo.map_kd = textureFile;
                        }
                    }

                    mtl.setCrossOrigin(true);
                    mtl.preload();

                    const materials: { readonly [key: string]: THREE.Material } = mtl.materials;

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

                    const objLoader = new THREE.OBJLoader2();
                    const callbackOnLoadObj = (event) => {
                        for (const child of event.detail.loaderRootNode.children) {
                            // if child has multi material, we need set child's material to first material in the list
                            if (Array.isArray(child.material)) {
                                child.material = child.material.find((o: THREE.Material) => {
                                    for (const materialKey in materials) {
                                        if (materials.hasOwnProperty(materialKey)) {
                                            const material = materials[materialKey];
                                            if (material.name = o.name) {
                                                return true;
                                            }
                                        }
                                    }
                                });
                            }
                            child.material.flatShading = false;
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.scale.set(0.1, 0.1, 0.1);
                            this.fadeIn(child);
                        }

                        event.detail.loaderRootNode.name = productModule.component.id;
                        this.scene.add(event.detail.loaderRootNode);
                    };

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

    @autobind
    takeScreenshot() {
        return new Promise<string>((resolve) => {
            this.resetCamera();
            setTimeout(
                () => {
                    const base64 = this.renderer.domElement.toDataURL('image/jpeg');
                    resolve(base64);
                },
                500
            );
        });
    }
}