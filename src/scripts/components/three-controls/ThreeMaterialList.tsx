import './ThreeMaterialList.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import styled from 'styled-components';

import { AntdList, AntdIcon } from '@/components';
import { FurnutureMaterial, uploadedFileUtils, withMaterials, restfulStore, WithMaterialProps } from '@/restful';
import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { Img } from '@/components/domain-components';
import { CommonStoreProps } from '@/configs';

const { THREE } = window;

const ListHeader = styled.div`
    margin: 15px 0;
`;

interface ThreeMaterialListProps extends WithStoreValuesDispatchs, WithMaterialProps {
    readonly materials: FurnutureMaterial[];
    readonly selectedObject: THREE.Mesh;
    readonly selectedTexture: string;
}

@withMaterials(restfulStore)
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
                <ListHeader>Vật liệu khả dụng</ListHeader>
                <AntdList
                    dataSource={materials}
                    grid={{ gutter: 16, column: 3 }}
                    renderItem={(material: FurnutureMaterial) => (
                        <AntdList.Item>
                            <div
                                className={classNames(
                                    'three-material-list-material',
                                    { selected: selectedTexture === uploadedFileUtils.getUrl(material.texture) }
                                )}
                            >
                                <Img
                                    file={material.texture}
                                    onClick={() => this.onMaterialSelect(material)}
                                />
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
        const textureFile = uploadedFileUtils.getUrl(material.texture);
        texture.load(textureFile, (map) => {
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['map'].image = map.image;
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['map'].needsUpdate = true;
            // tslint:disable-next-line:no-string-literal
            selectedObject.material['needsUpdate'] = true;

            this.props.setStore({ selectedTexture: textureFile });
        });
    }
}

export const ThreeMaterialList = withStoreValues(
    'selectedObject',
    'selectedTexture',
    nameof<CommonStoreProps>(o => o.selectedMaterialType)
)(ThreeMaterialListComponent);
