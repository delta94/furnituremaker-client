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
    padding: 0 0 0 0;
    transition: all 0.2s;
`;

const ProductTypeInfoWrapper = styled.div`
    margin-right: 4px;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
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
        const productInfoStaticEnd = document.getElementById('productInfoStaticEnd');
        const productSenceStaticStart = document.getElementById('productSenceStaticStart');
        const productSenceStaticEnd = document.getElementById('productSenceStaticEnd');

        const productInfoCardHoler = document.getElementById('productInfoCardHoler');
        const productInfoCard = productInfoCardHoler.children[0] as HTMLElement;

        var static1Bounding = productSenceStaticStart.getBoundingClientRect();

        window.addEventListener('scroll', (e) => {
            const isInfoMarkerHidden = !visibleInViewPort(productInfoStaticEnd);
            const productSenceStaticEndVisible = visibleInViewPort(productSenceStaticEnd);

            const documentScrollTop = getDocumentScrollTop();

            const staticTop = this.state.affix ? (documentScrollTop - static1Bounding.top) + 60 : this.state.staticTop;

            if (isInfoMarkerHidden) {
                productInfoCard.style.position = 'static';
            } else {
                const productSenceStaticEndBounding = productSenceStaticEnd.getBoundingClientRect();
                const productInfoCardBounding = productInfoCard.getBoundingClientRect();
                const productInfoCardHolerBounding = productInfoCardHoler.getBoundingClientRect();

                productInfoCardHoler.style.height = `${productInfoCardBounding.height}px`;
                productInfoCard.style.position = 'fixed';

                if (productSenceStaticEndVisible) {
                    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    // tslint:disable-next-line:no-string-literal
                    const currentViewPortY = productSenceStaticEndBounding['y'];

                    const bottom = viewportHeight - currentViewPortY;
                    productInfoCard.style.bottom = `${bottom}px`;
                } else {
                    productInfoCard.style.bottom = '0';
                }
                productInfoCard.style.width = `${productInfoCardBounding.width}px`;
            }

            this.setState({
                affix: isInfoMarkerHidden,
                staticTop: staticTop > 0 ? staticTop : 0
            });
        });
    }

    render() {
        const { setStore, selectedProduct, selectedObject, product } = this.props;

        return (
            <React.Fragment>
                <span id="productSenceStaticStart" />
                <AntdAffix
                    offsetTop={70}
                    target={() =>
                        this.state.affix ?
                            window : document.body}
                >
                    <div
                        id="productSenceWrapper"
                        style={{
                            position: 'relative',
                            paddingTop: this.state.affix ? 0 : this.state.staticTop
                        }}
                    >
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
                            <ProductDetailSectionLablel marginTop={0}>
                                Xem thông số kỹ thuật
                            </ProductDetailSectionLablel>
                            <ProductTypeInfo />
                        </ProductTypeInfoWrapper>
                    </div>
                </AntdAffix>
                <span id="productSenceStaticEnd" />
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