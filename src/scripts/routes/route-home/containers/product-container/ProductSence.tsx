import * as React from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import { ThreeSence } from '@/components';
import { FurnutureMaterial } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';

import { allComponents } from '../../data';

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
    selectedObject?: THREE.Mesh | null;
}

@withStoreValues('selectedObject')
export class ProductSence extends React.Component<RouteHomeProps> {
    render() {
        return (<ThreeSence onObjectSelect={this.onObjectSelect} />);
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