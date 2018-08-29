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
    AntdModal,
    AntdPopover,
    AntdRow
} from '@/components/antd-component';
import { CommonStoreProps } from '@/configs';
import { CreateComponentFormControl } from '@/forms/create-component';
import {
    FurnitureComponent,
    Product,
    productUtils,
    uploadedFileUtils
} from '@/restful';
import { apiEntry } from '@/restful/apiEntry';
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

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProduct),
    nameof<CommonStoreProps>(o => o.product3Dsence),
)
class ThreeComponentListComponent extends React.PureComponent<ThreeComponentListProps> {

    readonly componentUpdatePage = apiEntry('/admin/plugins/content-manager/components');

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

    render() {
        const { selectedObject, components } = this.props;
        const child = selectedObject.children[0] as THREE.Mesh;
        (child.material as THREE.MeshPhongMaterial).map.needsUpdate = true;
        return (
            <React.Fragment>
                <ListHeader>
                    Cấu kiện thay thế
                    {
                        <AccessControl allowRoles="root">
                            <CreateComponentFormControl/>
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
                    renderItem={(component: FurnitureComponent) => (
                        <AntdList.Item>
                            <div
                                className={classNames(
                                    'three-component-list-component',
                                    { selected: selectedObject.name === component.id }
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
                            </div>
                        </AntdList.Item>
                    )}
                />

            </React.Fragment>
        );
    }

    onComponentSelect(component: FurnitureComponent) {
        const { selectedObject, setStore, selectedProduct, product3Dsence } = this.props;

        if (component.id === selectedObject.name) {
            return;
        }

        const objLoader = new THREE.OBJLoader2();
        const callbackOnLoad = (event) => {
            const child = selectedObject.children[0] as THREE.Mesh;

            for (const mesh of event.detail.loaderRootNode.children) {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.material = child.material;
            }

            event.detail.loaderRootNode.name = component.id;
            product3Dsence.scene.remove(selectedObject);
            product3Dsence.scene.add(event.detail.loaderRootNode);
            const nextModules = selectedProduct.modules.map(productModule => {

                const nextComponent = (selectedObject.name === productModule.component.id) ?
                    component : productModule.component;

                return {
                    ...productModule,
                    component: nextComponent,
                    componentPrice: nextComponent.price
                };
            });

            const nextSelectedProduct: Product = {
                ...selectedProduct,
                modules: nextModules,
                totalPrice: productUtils.getTotalPriceFromModules(nextModules, 0)
            };

            setStore<ThreeComponentListProps>({
                selectedObject: event.detail.loaderRootNode,
                selectedProduct: nextSelectedProduct,
                selectedComponent: component
            });
        };
        const objFile = uploadedFileUtils.getUrl(component.obj);
        objLoader.load(objFile, callbackOnLoad);
    }
}

export const ThreeComponentList = withStoreValues(
    'selectedObject',
    'components'
)(ThreeComponentListComponent);