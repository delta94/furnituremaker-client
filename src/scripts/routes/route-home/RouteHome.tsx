import './RouteHome.scss';

import * as React from 'react';
import autobind from 'autobind-decorator';

import { ThreeSence, AntdRow, AntdCol, ThreeMaterialList } from '@/components';
import { FurnutureMaterial } from '@/resources';
import { withStoreValues, WithStoreValuesProps } from '@/app';

const components = [
    'sofa_design1_base1',
    'sofa_design1_base2',
    'sofa_design1_back1',
    'sofa_design1_back2',
    'sofa_design1_hands1',
    'sofa_design1_foots1',
    'sofa_design1_pillow1',
    'sofa_design1_pillow2'
];

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
        texture: `/static/models/sofa/maps/${material}.jpg`
    };
});

const productPieces = components.map(o => ({
    component: {
        id: o,
        name: o,
        obj: `/static/models/sofa/${o}.obj`,
        mtl: `/static/models/sofa/${o}.mtl`
    },
    material: materialSource[0]
}));

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
            productPieces: productPieces
        });
    }

    render() {
        return (
            <div id="home" className="page">
                <AntdRow className="h-100" type="flex">
                    <AntdCol className="three-sence-container" span={16}>
                        <ThreeSence onObjectSelect={this.onObjectSelect} />
                    </AntdCol>
                    <AntdCol span={8}>
                        <div className="three-sence-control">
                            {this.props.selectedObject && (<ThreeMaterialList />)}
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
                selectedObject: object,
                selectedTexture: null
            });
        }
        return this.props.setStore({
            materials: materialSource,
            selectedObject: object,
            selectedTexture: object.material['map'].image.src.replace(location.origin, '')
        });
    }
}