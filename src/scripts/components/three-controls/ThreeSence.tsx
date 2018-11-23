// tslint:disable:no-string-literal
// tslint:disable:no-console
// tslint:disable:no-array-mutation
import './ThreeSence.scss';

import * as React from 'react';
import styled from 'styled-components';
import { Material } from 'three';

import { WithStoreValuesDispatchs } from '@/app';
import { FurnitureMaterial, ProductModule, uploadedFileUtils } from '@/restful';

import { AntdSpin } from '../antd-component';
import { SenceProductInfo } from './three-sence';
import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';

const { THREE } = window;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface ThreeSenceProps extends ThreeSenceBaseProps, WithStoreValuesDispatchs {
    readonly productModules: ProductModule[];
    readonly selectedObject: THREE.Group;
    readonly setSence: (threeSence: ThreeSence) => void;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    readonly state = {
        loaded: false
    };

    // tslint:disable-next-line:readonly-keyword
    private loaded3DComponents: Array<THREE.Group> = [];

    static readonly loadNormalMap = (material: FurnitureMaterial, meshMaterial: THREE.MeshPhongMaterial) => {
        const normalMapLoader = new THREE.TextureLoader();
        normalMapLoader.load(
            uploadedFileUtils.getUrl(material.view_normalMap),
            function (texture: THREE.Texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;

                meshMaterial['normalMap'] = texture;
                meshMaterial.needsUpdate = true;
            }
        );
    }

    componentDidMount() {
        this.initSence();
        this.initContent();
        this.props.setSence(this);
    }

    componentDidUpdate() {
        this.selectObject(this.props.selectedObject);
        this.calcComponentsPosition();
    }

    componentWillUnmount() {
        if (this.animationFrameId) {
            this.clearScene();
        }
    }

    render() {
        const { productType, selectedObject } = this.props;

        return (
            <React.Fragment>
                <div style={{position: 'relative'}}>
                    {!this.state.loaded &&
                        <Overlay>
                            <AntdSpin />
                        </Overlay>
                    }
                    <div
                        id="threeViewWindow"
                        ref={(element) => this.container = element}
                        style={{
                            width: '100%',
                            height: productType.view_senceHeight
                        }}
                    />
                </div>
                <SenceProductInfo
                    selectedObject={selectedObject}
                />
            </React.Fragment>
        );
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

                    const materials = mtl.materials as THREE.MeshPhongMaterial[];

                    for (const key in materials) {
                        if (materials.hasOwnProperty(key)) {
                            const material = materials[key];
                            material.transparent = true;
                            if (material.map) {
                                material.map.anisotropy = 16;
                                material.shininess = productModule.material.materialType.view_shiny || 0;
                            }

                            if (productModule.material.view_normalMap) {
                                ThreeSence.loadNormalMap(productModule.material, material);
                            }
                        }
                    }

                    const objLoader = new THREE.OBJLoader2();
                    const callbackOnLoadObj = this.callbackOnLoadObj(productModule, materials);

                    objLoader.setLogging(false, false);
                    objLoader.setMaterials(materials);
                    objLoader.setModelName(productModule.component.name);

                    const objFile = uploadedFileUtils.getUrl(productModule.component.obj);
                    objLoader.load(objFile, callbackOnLoadObj, null, null, null, false);
                };

                const mtlLoader = new THREE.MTLLoader();
                const mtlFile = uploadedFileUtils.getUrl(productModule.component.mtl);
                mtlLoader.load(mtlFile, onLoadMtl);
                continue;
            }

            if (productModule.component.fbx) {
                const fbxLoader = new THREE.FBXLoader();
                const fbxFile = uploadedFileUtils.getUrl(productModule.component.fbx);
                fbxLoader.load(
                    fbxFile,
                    (object) => {
                        for (const child of object.children) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.name = productModule.component.id;
                        }
                        this.scene.add(object);
                    },
                    undefined,
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }

    readonly callbackOnLoadObj = (productModule: ProductModule, materials: Material[]) => (event) => {
        const root = event.detail.loaderRootNode;
        for (const child of root.children) {
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
            child.castShadow = true;
            child.receiveShadow = true;
            child.scale.set(0.1, 0.1, 0.1);
        }

        root.name = productModule.component.id;

        this.scene.add(root);
        this.loaded3DComponents.push(root);

        if (this.loaded3DComponents.length === this.props.productModules.length) {
            this.modulesLoadCompleted();
        }
    }

    readonly modulesLoadCompleted = () => {
        this.calcComponentsPosition();
        this.setState({
            loaded: true
        });
    }

    readonly calcComponentsPosition = () => {
        const leg = this.props.productModules.find(o => o.component.componentType.position === 'leg');
        if (!leg) {
            return;
        }

        const top = this.props.productModules.find(o => o.component.componentType.position === 'top');
        if (!top) {
            return;
        }

        const top3DComponent = this.scene.children.find(o => o.name === top.component.id);
        if (!top3DComponent) {
            return;
        }

        for (const child of top3DComponent.children) {
            child.position.setY(leg.component.height * 0.1);
        }
    }

    readonly takeScreenshot = () => {
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