import './ThreeComponentList.scss';
import * as React from 'react';
import * as classNames from 'classnames';
import styled from 'styled-components';

import { AntdList, Img } from '@/components';
import { FurnitureComponent, uploadedFileUtils, Product } from '@/restful';
import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

const ListHeader = styled.div`
    margin: 15px 0;
`;

const { THREE } = window;

export interface ThreeComponentListProps extends CommonStoreProps {
    readonly components: FurnitureComponent[];
    readonly selectedObject: THREE.Mesh;
    readonly selectedMaterial: string;
    readonly sence: THREE.Scene;
}

@withStoreValues(nameof<CommonStoreProps>(o => o.selectedProduct))
class ThreeComponentListComponent extends React.PureComponent<ThreeComponentListProps> {
    render() {
        const { selectedObject, components } = this.props;
        (selectedObject.material as THREE.MeshPhongMaterial).map.needsUpdate = true;
        return (
            <React.Fragment>
                <ListHeader>Cấu kiện thay thế</ListHeader>
                <AntdList
                    dataSource={components}
                    grid={{ gutter: 16, column: 3 }}
                    renderItem={(component: FurnitureComponent) => (
                        <AntdList.Item>
                            <div
                                className={classNames(
                                    'three-component-list-component',
                                    { selected: selectedObject.name === component.id }
                                )}
                            >
                                <Img file={component.thumbnail} onClick={() => this.onComponentSelect(component)} />
                            </div>
                        </AntdList.Item>
                    )}
                />
            </React.Fragment>
        );
    }

    onComponentSelect(component: FurnitureComponent) {
        const { selectedObject, setStore, selectedProduct } = this.props;

        if (component.id === selectedObject.name) {
            return;
        }

        const objLoader = new THREE.OBJLoader2();
        const callbackOnLoad = (event) => {
            for (const mesh of event.detail.loaderRootNode.children) {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.name = component.id;
                // mesh.scale.set(0.1, 0.1, 0.1);
                mesh.material = selectedObject.material;

                const selectedObjectParent = selectedObject.parent;
                selectedObjectParent.remove(selectedObject);
                selectedObjectParent.add(mesh);

                const nextSelectedProduct: Product = {
                    ...selectedProduct,
                    modules: selectedProduct.modules.map(productModule => {

                        const nextComponent = (selectedObject.name === productModule.component.id) ?
                            component : productModule.component;

                        return {
                            ...productModule,
                            component: nextComponent,
                            componentPrice: nextComponent.price
                        };
                    })
                };

                setStore({
                    selectedObject: mesh,
                    [nameof<CommonStoreProps>(o => o.selectedProduct)]: nextSelectedProduct
                });
            }
        };
        const objFile = uploadedFileUtils.getUrl(component.obj);
        objLoader.load(objFile, callbackOnLoad);
    }
}

export const ThreeComponentList = withStoreValues(
    'selectedObject',
    'components'
)(ThreeComponentListComponent);