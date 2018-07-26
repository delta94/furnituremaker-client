import './RouteHome.scss';

import * as React from 'react';
import autobind from 'autobind-decorator';

import { ThreeSence, AntdRow, AntdCol, ThreeMaterialList, ThreeComponentList } from '@/components';
import { FurnutureMaterial, productType, productTypeGroupResources, restfulStore, resfulFetcher } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';

import { initComponents, avaliableComponents, allComponents } from './data';
import { ProductTypeGroupList } from '@/components/domain-components';
import { RestfulRender } from 'react-restful';

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

                <AntdRow className="h-100" type="flex">
                    <AntdCol className="three-sence-container" span={16}>
                        <ThreeSence onObjectSelect={this.onObjectSelect} />
                    </AntdCol>
                    <AntdCol span={8}>
                        <div className="three-sence-control">
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
                        </div>
                    </AntdCol>
                </AntdRow>
            </div>
        );
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