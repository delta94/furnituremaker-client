import './ThreeComponentList.scss';

import * as React from 'react';
import styled from 'styled-components';

import {
    AntdCol,
    AntdDivider,
    AntdIcon,
    AntdPopover,
    AntdRow
} from '@/components/antd-component';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureComponent,
    FurnitureMaterial,
    furnitureMaterialResouceType,
    ProductExtended,
    productUtils,
    restfulStore,
    uploadedFileUtils
} from '@/restful';
import { apiEntry } from '@/restful';
import { formatCurrency } from '@/utilities';

const ComponentOptions = styled.a`
    right: 5px;
    position: absolute;
`;

const { THREE } = window;

export interface ThreeComponentListProps extends CommonStoreProps {
    readonly components?: FurnitureComponent[];
    readonly selectedObject?: THREE.Group;
    readonly selectedMaterial?: FurnitureMaterial;
    readonly sence?: THREE.Scene;
}

export class ThreeComponentListBase extends React.PureComponent<ThreeComponentListProps> {
    readonly componentUpdatePage = apiEntry('/admin/plugins/content-manager/components');

    readonly state: {
        readonly loading: boolean;
        readonly nextSelectComponent: FurnitureComponent;
    };

    constructor(props: ThreeComponentListProps) {
        super(props);
        this.state = {
            loading: false,
            nextSelectComponent: null
        };
    }

    readonly getFilteredComponents = () => {
        const {
            selectedObject,
            components,
            selectedComponentGroup,
            selectedComponentHeight,
            selectedComponentDiameter
        } = this.props;

        const selectedComponent = components.find(o => o.id === selectedObject.name);

        let filteredComponentByGroup: FurnitureComponent[] = components;
        if (selectedComponent.componentType.isBase) {
            filteredComponentByGroup = components;
        } else {
            filteredComponentByGroup = selectedComponentGroup ?
                components.filter(o => o.componentGroup && o.componentGroup.id === selectedComponentGroup.id) :
                components;
        }

        if (selectedComponentHeight) {
            const heightFiltered = filteredComponentByGroup.filter(o => o.height === +selectedComponentHeight);
            if (heightFiltered.length) {
                filteredComponentByGroup = heightFiltered;
            }
        }

        if (selectedComponentDiameter) {
            const diameterFiltered = filteredComponentByGroup.filter(o => o.diameter === +selectedComponentDiameter);
            if (diameterFiltered.length) {
                filteredComponentByGroup = diameterFiltered;
            }
        }

        return filteredComponentByGroup;
    }

    componentDidUpdate(prevProps: ThreeComponentListProps) {
        const {
            selectedComponent,
            selectedComponentHeight,
            selectedComponentDiameter
        } = this.props;

        if (
            selectedComponentHeight !== prevProps.selectedComponentHeight ||
            selectedComponentDiameter !== prevProps.selectedComponentDiameter
        ) {
            const filteredComponents = this.getFilteredComponents();
            const nextSelectComponent = filteredComponents[selectedComponent.variantIndex || 0];
            this.onComponentSelect(nextSelectComponent);
        }
    }

    readonly renderPopover = (component: FurnitureComponent) => {
        const updatePageHref = `${this.componentUpdatePage}/${component.id}?source=content-manager`;
        return (
            <AntdPopover
                placement="left"
                title="Thông tin cấu kiện"
                content={(
                    <React.Fragment>
                        <AntdRow>
                            <AntdCol span={12}>Mã: </AntdCol>
                            <AntdCol span={12}>{component.code}</AntdCol>
                        </AntdRow>
                        <AntdRow>
                            <AntdCol span={12}>Giá: </AntdCol>
                            <AntdCol span={12}>{formatCurrency(component.price)}</AntdCol>
                        </AntdRow>
                        <AntdDivider dashed={true} />
                        <a href={updatePageHref} target="blank">
                            Cập nhật
                        </a>
                    </React.Fragment>
                )}
            >
                <ComponentOptions>
                    <AntdIcon type="ellipsis" />
                </ComponentOptions>
            </AntdPopover>
        );
    }

    componentWillUnmount() {
        const { setStore } = this.props;
        setStore<ThreeComponentListProps>({
            selectedComponent: null,
            selectedComponentDiameter: null,
            selectedComponentHeight: null
        });
    }

    readonly findComponentIndex = (component: FurnitureComponent) => {
        const filteredComponents = this.getFilteredComponents();
        return filteredComponents.findIndex(o => o.id === component.id);
    }

    onComponentSelect(targetComponent: FurnitureComponent) {
        const {
            allComponents,
            selectedObject,
            selectedComponent,
            setStore,
            selectedProduct,
            product3Dsence,
        } = this.props;

        const targetComponentGroup = targetComponent.componentGroup;

        if (targetComponent.id === selectedObject.name) {
            return;
        }

        if (
            JSON.stringify(selectedComponent.materialTypes) !==
            JSON.stringify(targetComponent.materialTypes)
        ) {
            const nextSelectMaterialType = targetComponent.materialTypes[0];
            setStore<CommonStoreProps>({
                selectedMaterialType: nextSelectMaterialType
            });
        }

        this.setState({
            loading: true,
            nextSelectComponent: targetComponent
        });

        const objLoader = new THREE.OBJLoader2();
        const callbackOnLoad = (event) => {
            const child = selectedObject.children[0] as THREE.Mesh;

            for (const mesh of event.detail.loaderRootNode.children) {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.material = child.material;
            }

            event.detail.loaderRootNode.name = targetComponent.id;
            product3Dsence.scene.remove(selectedObject);
            product3Dsence.scene.add(event.detail.loaderRootNode);

            const nextModules = selectedProduct.modules.map(productModule => {

                let nextComponent = (selectedObject.name === productModule.component.id) ?
                    targetComponent : productModule.component;

                if (
                    (nextComponent.componentGroup && targetComponentGroup) &&
                    (nextComponent.componentGroup.id !== targetComponentGroup.id)
                ) {
                    const oldComponent = nextComponent.id;

                    nextComponent = allComponents.find(o => {
                        const canBecomeNext = o.componentType.id === nextComponent.componentType.id;
                        if (!canBecomeNext) {
                            return false;
                        }

                        if (!o.componentGroup && !targetComponentGroup) {
                            return true;
                        }

                        if (
                            (o.componentGroup && targetComponentGroup) &&
                            (o.componentGroup.id === targetComponentGroup.id)) {
                            return true;
                        }

                        return false;
                    });

                    product3Dsence.scene.traverse(o => {
                        if (o.name === oldComponent) {
                            this.loadNewComponentObj(o as THREE.Group, nextComponent);
                        }
                    });
                }

                let nextMaterial = productModule.material;
                let diff = nextComponent.materialTypes.find(o =>
                    o.id === productModule.material.materialType.id
                );

                if (!diff) {
                    nextMaterial = restfulStore.findOneRecord(
                        furnitureMaterialResouceType,
                        // tslint:disable-next-line:no-any
                        (o) => (o.materialType as any) === nextComponent.materialTypes[0].id
                    );
                }

                return {
                    material: nextMaterial,
                    materialPrice: nextMaterial.price,
                    component: nextComponent,
                    componentPrice: nextComponent.price
                };
            });

            const nextSelectedProduct: ProductExtended = {
                ...selectedProduct,
                modules: nextModules,
                totalPrice: productUtils.getTotalPriceFromModules(nextModules, 0)
            };

            setStore<ThreeComponentListProps>({
                selectedObject: event.detail.loaderRootNode,
                selectedProduct: nextSelectedProduct,
                selectedComponent: targetComponent,
                selectedComponentGroup: targetComponentGroup,
                selectedMaterial: nextModules.find(o => o.component.id === targetComponent.id).material
            });

            this.setState({
                loading: false,
                nextSelectComponent: null
            });
        };

        const objFile = uploadedFileUtils.getUrl(targetComponent.obj);
        objLoader.load(objFile, callbackOnLoad);
    }

    readonly loadNewComponentObj = (oldObj: THREE.Group, newComponent: FurnitureComponent) => {
        const { product3Dsence } = this.props;

        const objLoader = new THREE.OBJLoader2();

        const objFile = uploadedFileUtils.getUrl(newComponent.obj);
        objLoader.load(objFile, (event) => {
            const child = oldObj.children[0] as THREE.Mesh;

            for (const mesh of event.detail.loaderRootNode.children) {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.material = child.material;
            }
            event.detail.loaderRootNode.name = newComponent.id;

            for (var i = oldObj.children.length - 1; i >= 0; i--) {
                product3Dsence.scene.remove(oldObj);
            }

            product3Dsence.scene.add(event.detail.loaderRootNode);
        });
    }
} 