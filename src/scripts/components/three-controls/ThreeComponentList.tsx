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
    readonly components: FurnitureComponent[];
    readonly selectedObject: THREE.Group;
    readonly selectedMaterial: string;
    readonly sence: THREE.Scene;
}

@withStoreValues<CommonStoreProps>(
    'selectedProduct',
    'product3Dsence',
    'selectedComponent'
)
class ThreeComponentListComponent extends React.PureComponent<ThreeComponentListProps> {

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
        const { selectedObject, components } = this.props;
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
                    dataSource={components}
                    grid={{ gutter: 16, column: 3 }}
                    pagination={{
                        pageSize: 6,
                        simple: true
                    }}
                    renderItem={(component: FurnitureComponent) => {
                        const isSelected = (selectedObject.name === component.id);
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
            selectedObject,
            selectedComponent,
            setStore,
            selectedProduct,
            product3Dsence
        } = this.props;

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

                const nextComponent = (selectedObject.name === productModule.component.id) ?
                    targetComponent : productModule.component;

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
                selectedComponent: targetComponent
            });
            this.setState({
                loading: false,
                nextSelectComponent: null
            });
        };
        const objFile = uploadedFileUtils.getUrl(targetComponent.obj);
        objLoader.load(objFile, callbackOnLoad);
    }
}

export const ThreeComponentList = withStoreValues(
    'selectedObject',
    'components'
)(ThreeComponentListComponent);