import './ThreeMaterialList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdList, AntdTabs, AntdTooltip, Img } from '@/components';
import { AntdIcon } from '@/components/antd-component';
import { Loading } from '@/components/domain-components/generic/Loading';
import { colorPrimary, CommonStoreProps } from '@/configs';
import {
    FurnutureMaterial,
    Product,
    restfulStore,
    uploadedFileUtils,
    WithMaterialProps,
    withMaterialsByType
} from '@/restful';

export interface ThreeMaterialListProps extends
    CommonStoreProps,
    WithMaterialProps {
    readonly materials: FurnutureMaterial[];
    readonly selectedObject: THREE.Group;
    readonly selectedMaterial: FurnutureMaterial;
}

@withMaterialsByType(restfulStore)
@withStoreValues<ThreeMaterialListProps>(
    'selectedMaterial',
    'selectedProduct'
)
class ThreeMaterialListComponent extends React.PureComponent<ThreeMaterialListProps> {
    readonly state: {
        readonly loading: boolean;
        readonly nextSelectMaterial: FurnutureMaterial;
    };

    constructor(props: ThreeMaterialListProps) {
        super(props);
        this.state = {
            loading: false,
            nextSelectMaterial: null
        };
    }

    render() {
        const { selectedMaterial, materials } = this.props;
        const { loading, nextSelectMaterial } = this.state;
        return (
            <div className="three-material-list">
                <AntdTabs>
                    <AntdTabs.TabPane tab="Vật liệu">
                        <AntdList
                            dataSource={materials}
                            grid={{ gutter: 16, column: 3 }}
                            pagination={{
                                pageSize: 6,
                                simple: true
                            }}
                            renderItem={(material: FurnutureMaterial) => {
                                const isSelected = (selectedMaterial.id === material.id);
                                const isNextSelected = nextSelectMaterial && (nextSelectMaterial.id === material.id);

                                return (
                                    <AntdList.Item>
                                        <AntdTooltip
                                            title={material.description || material.name}
                                        >
                                            <div
                                                className={classNames(
                                                    'three-material-list-material',
                                                    { selected: isSelected }
                                                )}
                                            >
                                                <Img
                                                    file={material.texture}
                                                    size="img256x256"
                                                    onClick={() => this.onMaterialSelect(material)}
                                                />
                                                {(loading && isNextSelected) && (<Loading />)}
                                            </div>
                                        </AntdTooltip>
                                    </AntdList.Item>
                                );
                            }}
                        />
                    </AntdTabs.TabPane>
                </AntdTabs>
            </div>
        );
    }

    onMaterialSelect(material: FurnutureMaterial) {
        const { selectedObject, selectedProduct } = this.props;
        const texture = new window.THREE.TextureLoader();
        const textureFile = uploadedFileUtils.getUrl(material.texture);

        this.setState({
            loading: true,
            nextSelectMaterial: material
        });

        texture.load(textureFile, (map) => {
            for (const mesh of selectedObject.children as THREE.Mesh[]) {
                const meshPhongMaterial = mesh.material as THREE.MeshPhongMaterial;
                meshPhongMaterial.map.image = map.image;
                meshPhongMaterial.map.needsUpdate = true;
                meshPhongMaterial.needsUpdate = true;
            }

            const nextSelectedProduct: Product = {
                ...selectedProduct,
                modules: selectedProduct.modules.map(productModule => {

                    const nextMaterial = (selectedObject.name === productModule.component.id) ?
                        material : productModule.material;

                    return {
                        ...productModule,
                        material: nextMaterial,
                        materialPrice: nextMaterial.price
                    };
                })
            };
            this.props.setStore<ThreeMaterialListProps>({
                selectedMaterial: material,
                selectedProduct: nextSelectedProduct
            });
            this.setState({
                loading: false
            });
        });
    }
}

export const ThreeMaterialList = withStoreValues<ThreeMaterialListProps>(
    'selectedObject',
    'selectedMaterial',
    'selectedMaterialType'
)(ThreeMaterialListComponent);