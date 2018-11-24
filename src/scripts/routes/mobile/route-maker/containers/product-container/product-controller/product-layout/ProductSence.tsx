import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Sticky from 'sticky-js';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdTabs, ThreeMaterialListProps, ThreeSence } from '@/components';
import {
    ThreeComponentListMobile,
    ThreeMaterialListMobile
} from '@/components/three-controls';
import { CommonStoreProps } from '@/configs';
import {
    ProductExtended,
    uploadedFileUtils,
    withComponents,
    WithComponentsProps,
    WithMaterialProps,
    withMaterials
} from '@/restful';

import { SenceProductInfo } from './product-sence';

const ProductSenceWrapper = styled.div`
    height: 100%;
    .ant-tabs-bar {
        margin: 0 0 10px 0;
    }
`;

interface ProductSenceProps extends
    CommonStoreProps,
    WithComponentsProps,
    WithMaterialProps,
    Partial<Pick<ThreeMaterialListProps, 'selectedMaterial'>> {
    readonly selectedObject?: THREE.Group | null;
    readonly product: ProductExtended;
}

interface ProductSenceState {
    readonly selectedTab: string;
}

@withComponents()
@withMaterials()
@withStoreValues(
    nameof<ProductSenceProps>(o => o.selectedObject),
    nameof<ProductSenceProps>(o => o.selectedProduct),
)
export class ProductSence extends React.PureComponent<ProductSenceProps, ProductSenceState> {
    // tslint:disable-next-line:readonly-keyword
    sticky: Sticky;

    readonly state = {
        selectedTab: 'vl'
    };

    componentDidMount() {
        this.sticky = new Sticky('.sticky');
    }

    render() {
        const { setStore, selectedProduct, selectedObject, product } = this.props;
        return (
            <ProductSenceWrapper data-sticky-container={true}>
                <div className="sticky">
                    <div>
                        <ThreeSence
                            clearColor="#f1f1f1"
                            sampleLevel={0}
                            onObjectSelect={this.onObjectSelect}
                            selectedObject={selectedObject}
                            productModules={product.modules}
                            productType={selectedProduct.productType}
                            setSence={(threeScreen) => {
                                setStore({
                                    [nameof<CommonStoreProps>(o => o.product3Dsence)]: threeScreen
                                });
                            }}
                        />

                        {
                            selectedObject && (
                                <React.Fragment>
                                    <AntdTabs
                                        tabBarExtraContent={<Link to="/library">Thư viện vật liệu</Link>}
                                        onChange={(key) => this.setState({ selectedTab: key })}
                                        activeKey={this.state.selectedTab}
                                    >
                                        <AntdTabs.TabPane
                                            key="ck"
                                            tab="Cấu kiện"
                                        >
                                            <ThreeComponentListMobile />
                                        </AntdTabs.TabPane>
                                        <AntdTabs.TabPane
                                            key="vl"
                                            tab="Vật liệu"
                                        >
                                            <ThreeMaterialListMobile />
                                        </AntdTabs.TabPane>
                                    </AntdTabs>
                                    <SenceProductInfo />
                                </React.Fragment>

                            )
                        }
                    </div>
                </div>
            </ProductSenceWrapper>
        );
    }

    readonly onObjectSelect = (object: THREE.Group) => {
        if (!object) {
            return this.props.setStore({
                materials: [],
                components: [],
                selectedObject: object,
                selectedMaterial: null
            });
        }

        const { components, materials } = this.props;

        const componentData = components.find(o => o.id === object.name);
        const sameTypeComponents = components.filter(o => {
            if (!o.componentType) {
                return false;
            }

            return o.componentType.id === componentData.componentType.id;
        });

        const child = object.children[0] as THREE.Mesh;
        const objectMaterial = child.material as THREE.MeshPhongMaterial | THREE.MeshPhongMaterial[];

        const selectedMaterial = materials.find(material => {
            if (Array.isArray(objectMaterial)) {
                return uploadedFileUtils.getUrl(material.texture) === objectMaterial[0].map.image.src;
            }
            return uploadedFileUtils.getUrl(material.texture) === objectMaterial.map.image.src;
        });
        const selectedComponent = components.find(o => o.id === object.name);

        return this.props.setStore<ProductSenceProps>({
            materials: [],
            selectedObject: object,
            selectedMaterial: selectedMaterial,
            components: sameTypeComponents,
            allComponents: components,
            selectedMaterialType: componentData.materialTypes[0],
            selectedComponent: selectedComponent
        });
    }
}