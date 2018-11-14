import './ThreeMaterialList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStoreValues } from '@/app';
import { AntdList, AntdTabs, AntdTooltip } from '@/components/antd-component';
import { Img, Loading } from '@/components/domain-components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureMaterial,
    ProductExtended,
    uploadedFileUtils,
    WithMaterialProps,
    withMaterialsByType
} from '@/restful';

import { ThreeSence } from './ThreeSence';

export interface ThreeMaterialListProps extends
    Pick<CommonStoreProps, 'setStore'>,
    Required<Pick<CommonStoreProps, 'selectedProduct'>>,
    Required<Pick<CommonStoreProps, 'selectedMaterialType'>>,
    WithMaterialProps {
    readonly materials: FurnitureMaterial[];
    readonly selectedObject: THREE.Group;
    readonly selectedMaterial: FurnitureMaterial;
}

@withStoreValues<ThreeMaterialListProps>('selectedMaterialType')
@withMaterialsByType()
@withStoreValues<ThreeMaterialListProps>(
    'selectedMaterial',
    'selectedProduct'
)
class ThreeMaterialListComponent extends React.PureComponent<ThreeMaterialListProps> {
    readonly state: {
        readonly loading: boolean;
        readonly nextSelectMaterial: FurnitureMaterial;
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
                <AntdTabs
                    tabBarExtraContent={<Link to="/library">Thư viện vật liệu</Link>}
                >
                    <AntdTabs.TabPane
                        tab="Vật liệu"
                    >
                        <AntdList
                            dataSource={materials}
                            grid={{ gutter: 16, column: 3 }}
                            pagination={{
                                pageSize: 6,
                                simple: true,
                                style: { textAlign: 'center' }
                            }}
                            renderItem={(material: FurnitureMaterial) => {
                                const isSelected = (selectedMaterial.id === material.id);
                                const isNextSelected = nextSelectMaterial && (nextSelectMaterial.id === material.id);

                                return (
                                    <AntdList.Item key={material.id}>
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

    onMaterialSelect(material: FurnitureMaterial) {
        const { selectedObject, selectedProduct } = this.props;
        const texture = new window.THREE.TextureLoader();
        const textureFile = uploadedFileUtils.getUrl(material.texture);

        this.setState({
            loading: true,
            nextSelectMaterial: material
        });

        texture.load(textureFile, (map) => {
            const nextSelectedProduct = this.loadMaterial(map, material, selectedObject, selectedProduct);
            this.props.setStore<ThreeMaterialListProps>({
                selectedMaterial: material,
                selectedProduct: nextSelectedProduct
            });
            this.setState({
                loading: false
            });
        });
    }

    // tslint:disable-next-line:typedef
    loadMaterial(map, material, selectedObject, selectedProduct) {
        for (const mesh of selectedObject.children as THREE.Mesh[]) {
            const meshPhongMaterial = mesh.material as THREE.MeshPhongMaterial;
            meshPhongMaterial.map.image = map.image;
            meshPhongMaterial.map.needsUpdate = true;
            meshPhongMaterial.needsUpdate = true;
            if (material.view_normalMap) {
                ThreeSence.loadNormalMap(material, meshPhongMaterial);
            } else {
                meshPhongMaterial.normalMap = null;
            }
        }

        const nextSelectedProduct: ProductExtended = {
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

        return nextSelectedProduct;
    }
}

export const ThreeMaterialList = withStoreValues<ThreeMaterialListProps>(
    'selectedObject',
    'selectedMaterial',
    'selectedMaterialType'
)(ThreeMaterialListComponent);