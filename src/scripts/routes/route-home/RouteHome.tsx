import './RouteHome.scss';

import * as React from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import { ThreeSence, AntdRow, AntdCol, ThreeMaterialList, ThreeComponentList } from '@/components';
import { FurnutureMaterial, productTypeGroupResources, restfulStore, resfulFetcher } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';
import { ProductTypeGroupList } from '@/components';
import { RestfulRender } from 'react-restful';

import { ProductTypeContainer, ProductDesignContainer } from './containers';
import { initComponents, avaliableComponents, allComponents } from './data';

const materials = [
    '1701',
    '1702',
    '1703',
    '1704',
    '1705',
    '1706',
];

const materialSource: FurnutureMaterial[] = materials.map((material) => {
    return {
        id: material,
        name: material,
        texture: `/static/models/sofa/maps/${material}.jpg`,
        materialType: {
            id: 'farbic',
            name: 'farbic'
        },
        price: 0,
        inStock: true,
    };
});

interface RouteHomeProps extends WithStoreValuesProps {
    avaliableMaterials: FurnutureMaterial[];
    selectedObject: THREE.Mesh | null;
}

@withStoreValues('selectedObject')
export class RouteHome extends React.Component<RouteHomeProps> {
    static routeProps = {
        path: '/'
    };

    // tslint:disable-next-line:typedef
    constructor(props) {
        super(props);

        this.props.setStore({
            components: avaliableComponents,
            productPieces: initComponents.map(o => ({
                component: o,
                material: {
                    texture: '/static/models/sofa/maps/1701.jpg'
                }
            }))
        });
    }

    render() {
        return (
            <div id="home" className="page">
                <RestfulRender
                    fetcher={resfulFetcher}
                    store={restfulStore}
                    resource={productTypeGroupResources.find}
                    parameters={[]}
                    render={(renderProps) => {
                        if (renderProps.data) {
                            return <ProductTypeGroupList productTypeGroups={renderProps.data} />;
                        }
                        return null;
                    }}
                />
                <ProductTypeContainer />
                <ProductDesignContainer />
                {this.render3DSence()}
            </div>
        );
    }

    render3DSence() {
        return (
            <Wrapper>
                <AntdRow type="flex">
                    <AntdCol className="three-sence-container" span={16}>
                        <ThreeSence onObjectSelect={this.onObjectSelect} />
                    </AntdCol>
                    <AntdCol span={8}>
                        <ProductInfo>
                            {
                                this.props.selectedObject ? (
                                    <React.Fragment>
                                        <ThreeMaterialList />
                                        <ThreeComponentList />
                                    </React.Fragment>
                                ) : (
                                        <div>
                                            a
                                        </div>
                                    )
                            }
                        </ProductInfo>
                    </AntdCol>
                </AntdRow>
            </Wrapper>
        )
    }

    @autobind
    onObjectSelect(object: THREE.Mesh | null) {
        if (!object) {
            return this.props.setStore({
                materials: [],
                components: [],
                selectedObject: object,
                selectedTexture: null
            });
        }

        const componentData = allComponents.find(o => o.id === object.name);
        const sameTypeComponents = allComponents.filter(o => o.componentType.id === componentData.componentType.id);

        const material = object.material as THREE.MeshPhongMaterial;
        const currentTexturePathWithOrigin = material.map.image.src;
        return this.props.setStore({
            materials: materialSource,
            selectedObject: object,
            // tslint:disable-next-line:no-string-literal
            selectedTexture: currentTexturePathWithOrigin.replace(location.origin, ''),
            components: sameTypeComponents
        });
    }
}

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const ProductInfo = styled.div`
    border: 1px solid #DADADA;
    background: #fff;
    padding: 30px;
    overflow: auto;
`;