import autobind from 'autobind-decorator';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdAffix, ThreeMaterialListProps, ThreeSence } from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    ProductExtended,
    uploadedFileUtils,
    withComponents,
    WithComponentsProps,
    WithMaterialProps,
    withMaterials
} from '@/restful';
import {
    ProductDetailSectionLablel
} from '@/routes/route-product/containers/product-container';
import {
    ProductTypeInfo
} from '@/routes/route-product/containers/product-container/product-detail';

const ProductSenceWrapper = styled.div`
    padding: 60px 0 0 0;
    transition: all 0.2s;
`;

const ProductTypeInfoWrapper = styled.div`
    margin-right: 4px;
`;

interface ProductSenceProps extends
    CommonStoreProps,
    WithComponentsProps,
    WithMaterialProps,
    Partial<Pick<ThreeMaterialListProps, 'selectedMaterial'>> {
    readonly selectedObject?: THREE.Group | null;
    readonly product: ProductExtended;
}

var visibleInViewPort = (element) => {
    var bounding = element.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const getDocumentScrollTop = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return top;
};

@withComponents()
@withMaterials()
@withStoreValues(
    nameof<ProductSenceProps>(o => o.selectedObject),
    nameof<ProductSenceProps>(o => o.selectedProduct),
)
export class ProductSence extends React.PureComponent<ProductSenceProps> {
    readonly state: {
        readonly affix: boolean;
        readonly staticTop: number;
    } = {
            affix: true,
            staticTop: 0
        };

    componentDidMount() {
        const marker = document.getElementById('xxx');
        const static1 = document.getElementById('h');
        var static1Bounding = static1.getBoundingClientRect();

        window.addEventListener('scroll', (e) => {
            const isElementInView = visibleInViewPort(marker);
            const documentScrollTop = getDocumentScrollTop();

            const uu = this.state.affix ? documentScrollTop - static1Bounding.top : this.state.staticTop;

            this.setState({
                affix: !isElementInView,
                staticTop: uu > 0 ? uu : 0
            });
        });
    }

    render() {
        const { setStore, selectedProduct, selectedObject, product } = this.props;

        return (
            <React.Fragment>
                <div id="h" />
                <AntdAffix
                    offsetTop={10}
                    target={() =>
                        this.state.affix ?
                            window : document.body}

                >
                    <div style={{ marginTop: this.state.affix ? 0 : this.state.staticTop }}>
                        <ProductSenceWrapper>
                            <ThreeSence
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
                        </ProductSenceWrapper>
                        <ProductTypeInfoWrapper>
                            <ProductDetailSectionLablel>
                                Xem thông số kỹ thuật
                    </ProductDetailSectionLablel>
                            <ProductTypeInfo />
                        </ProductTypeInfoWrapper>
                    </div>
                </AntdAffix>
            </React.Fragment>
        );
    }

    @autobind
    onObjectSelect(object: THREE.Group) {
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
            selectedMaterialType: componentData.materialTypes[0],
            selectedComponent: selectedComponent
        });
    }
}