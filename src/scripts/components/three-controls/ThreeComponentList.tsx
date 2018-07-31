import './ThreeComponentList.scss';
import * as React from 'react';
import * as classNames from 'classnames';
import styled from 'styled-components';

import { AntdList } from '@/components';
import { FurnitureComponent, uploadedFileUtils } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';
import { Img } from '@/components/domain-components';

const { THREE } = window;

interface ThreeMaterialListProps extends WithStoreValuesProps {
    readonly components: FurnitureComponent[];
    readonly selectedObject: THREE.Mesh;
    readonly selectedTexture: string;
    readonly sence: THREE.Scene;
}

class ThreeComponentListComponent extends React.PureComponent<ThreeMaterialListProps> {
    render() {
        const { selectedObject, components } = this.props;
        selectedObject.material['map'].needsUpdate = true;
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
        const { selectedObject, setStore } = this.props;

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
                setStore({
                    selectedObject: mesh
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

const ListHeader = styled.div`
    margin: 15px 0;
`;