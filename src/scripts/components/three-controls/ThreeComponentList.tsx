import './ThreeComponentList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';

import { AccessControl, withStoreValues } from '@/app';
import { AntdList, Img } from '@/components';
import {
    AntdCol,
    AntdDivider,
    AntdIcon,
    AntdPopover,
    AntdRow,
    AntdTooltip
} from '@/components/antd-component';
import { Loading } from '@/components/domain-components';
import { CommonStoreProps } from '@/configs';
import { CreateComponentFormControl } from '@/forms/create-component';
import {
    ComponentGroup,
    FurnitureComponent,
    ProductExtended,
    productUtils,
    uploadedFileUtils
} from '@/restful';
import { apiEntry } from '@/restful';
import { formatCurrency } from '@/utilities';

const ListHeader = styled.div`
    margin: 15px 0;
`;

const ComponentOptions = styled.a`
    right: 5px;
    position: absolute;
`;

const { THREE } = window;

export interface ThreeComponentListProps extends CommonStoreProps {
    readonly components?: FurnitureComponent[];
    readonly selectedObject?: THREE.Group;
    readonly selectedMaterial?: string;
    readonly sence?: THREE.Scene;
}

@withStoreValues<ThreeComponentListProps>(
    'selectedProduct',
    'product3Dsence',
    'selectedComponent',
    'selectedComponentGroup',
    'selectedObject',
    'components',
    'allComponents'
)
export class ThreeComponentList extends React.PureComponent<ThreeComponentListProps> {

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
            selectedComponent: null
        });
    }

    render() {
        const { selectedObject, components, selectedComponentGroup } = this.props;
        const selectedComponent = components.find(o => o.id === selectedObject.name);

        let filteredComponentByGroup: FurnitureComponent[];
        if (selectedComponent.componentType.isBase) {
            filteredComponentByGroup = components;
        } else {
            filteredComponentByGroup = selectedComponentGroup ?
                components.filter(o => o.componentGroup && o.componentGroup.id === selectedComponentGroup.id) :
                components;
        }

        const child = selectedObject.children[0] as THREE.Mesh;
        (child.material as THREE.MeshPhongMaterial).map.needsUpdate = true;

        const { loading, nextSelectComponent } = this.state;
        return (
            <React.Fragment>
                <ListHeader>
                    Cấu kiện thay thế
                    {
                        <AccessControl allowRoles="root">
                            <CreateComponentFormControl />
                        </AccessControl>
                    }
                </ListHeader>
                <AntdList
                    dataSource={filteredComponentByGroup}
                    grid={{ gutter: 16, column: 3 }}
                    pagination={{
                        pageSize: 6,
                        simple: true,
                        style: { textAlign: 'center' }
                    }}
                    renderItem={(component: FurnitureComponent) => {
                        const isSelected = (selectedComponent.id === component.id);
                        const isNextSelected = nextSelectComponent && (nextSelectComponent.id === component.id);

                        return (
                            <AntdList.Item key={component.id}>
                                <AntdTooltip
                                    title={component.displayName}
                                >
                                    <div
                                        className={classNames(
                                            'three-component-list-component',
                                            { selected: isSelected }
                                        )}
                                    >
                                        <Img
                                            file={component.thumbnail}
                                            size="img256x256"
                                            onClick={() => this.onComponentSelect(component)}
                                        />
                                        <AccessControl allowRoles="root">
                                            {this.renderPopover(component)}
                                        </AccessControl>
                                        {(loading && isNextSelected) && (<Loading />)}
                                    </div>
                                </AntdTooltip>
                            </AntdList.Item>
                        );
                    }}
                />

            </React.Fragment>
        );
    }

    onComponentSelect(targetComponent: FurnitureComponent) {
        const {
            allComponents,
            selectedObject,
            selectedComponent,
            setStore,
            selectedProduct,
            product3Dsence
        } = this.props;

        const targetComponentGroup = targetComponent.componentGroup;

        if (targetComponent.id === selectedObject.name) {
            return;
        }

        if (
            JSON.stringify(selectedComponent.materialTypes) !==
            JSON.stringify(targetComponent.materialTypes)
        ) {
            setStore<CommonStoreProps>({
                selectedMaterialType: targetComponent.materialTypes[0]
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

                return {
                    ...productModule,
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
                selectedComponentGroup: targetComponentGroup
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
                oldObj.remove(oldObj.children[i]);
            }

            product3Dsence.scene.add(event.detail.loaderRootNode);
        });
    }
} 