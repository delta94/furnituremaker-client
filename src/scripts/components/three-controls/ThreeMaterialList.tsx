import './ThreeMaterialList.scss';

import * as React from 'react';
import * as classNames from 'classnames';

import { AntdList, AntdIcon } from '@/components';
import { FurnutureMaterial } from '@/resources';
import { withStoreValues, WithStoreValuesProps } from '@/app';

const { THREE } = window;

interface ThreeMaterialListProps extends WithStoreValuesProps {
    materials: FurnutureMaterial[];
    selectedObject: THREE.Mesh;
    selectedTexture: string;
}

class ThreeMaterialListComponent extends React.PureComponent<ThreeMaterialListProps> {
    render() {
        const { selectedTexture, materials } = this.props;

        return (
            <React.Fragment>
                <div
                    className="three-material-list-backbtn"
                    onClick={() => this.props.setStore({ selectedObject: null })}
                >
                    <AntdIcon type="arrow-left" />
                </div>
                <AntdList
                    header={<div>Vật liệu khả dụng</div>}
                    dataSource={materials}
                    grid={{ gutter: 16, column: 3 }}
                    renderItem={(material: FurnutureMaterial) => (
                        <AntdList.Item>
                            <div
                                className={classNames(
                                    'three-material-list-material',
                                    { selected: selectedTexture === material.texture }
                                )}
                            >
                                <img src={material.texture} onClick={() => this.onMaterialSelect(material)} />
                            </div>
                        </AntdList.Item>
                    )}
                />
            </React.Fragment>
        );
    }

    onMaterialSelect(material: FurnutureMaterial) {
        const { selectedObject } = this.props;
        const texture = new THREE.TextureLoader();

        texture.load(material.texture, (map) => {
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['map'].image = map.image;
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['map'].needsUpdate = true;
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['needsUpdate'] = true;

            this.props.setStore({ selectedTexture: material.texture });
        });
    }
}

export const ThreeMaterialList = withStoreValues(
    'selectedObject',
    'selectedTexture',
    'materials'
)(ThreeMaterialListComponent);