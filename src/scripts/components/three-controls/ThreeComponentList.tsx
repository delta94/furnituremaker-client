import './ThreeComponentList.scss';
import * as React from 'react';
import * as classNames from 'classnames';

import { AntdList, AntdIcon } from '@/components';
import { FurnutureComponent } from '@/resources';
import { withStoreValues, WithStoreValuesProps } from '@/app';

const { THREE } = window;

interface ThreeMaterialListProps extends WithStoreValuesProps {
    components: FurnutureComponent[];
    selectedObject: THREE.Mesh;
    selectedTexture: string;
    sence: THREE.Scene;
}

class ThreeComponentListComponent extends React.PureComponent<ThreeMaterialListProps> {
    render() {
        const { selectedObject, components } = this.props;

        return (
            <AntdList
                header={<div>Cấu kiện thay thế</div>}
                dataSource={components}
                grid={{ gutter: 16, column: 3 }}
                renderItem={(component: FurnutureComponent) => (
                    <AntdList.Item>
                        <div
                            className={classNames(
                                'three-component-list-component',
                                { selected: selectedObject.name === component.id }
                            )}
                        >
                            <img src={component.thumbnail} onClick={() => this.onComponentSelect(component)} />
                        </div>
                    </AntdList.Item>
                )}
            />
        );
    }

    onComponentSelect(component: FurnutureComponent) {
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
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.material = selectedObject.material;

                const selectedObjectParent = selectedObject.parent;
                selectedObjectParent.remove(selectedObject);
                selectedObjectParent.add(mesh);
                setStore({
                    selectedObject: mesh
                });
            }
        };
        objLoader.load(component.obj, callbackOnLoad);
    }
}

export const ThreeComponentList = withStoreValues(
    'selectedObject',
    'components'
)(ThreeComponentListComponent);