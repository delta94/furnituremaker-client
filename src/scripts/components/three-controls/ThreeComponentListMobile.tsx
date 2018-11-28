import './ThreeComponentList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Slider, { Settings } from 'react-slick';

import { AccessControl, withStoreValues } from '@/app';
import { Img } from '@/components';
import { AntdTooltip } from '@/components/antd-component';
import { Loading } from '@/components/domain-components';
import { FurnitureComponent } from '@/restful';

import {
    ThreeComponentListBase,
    ThreeComponentListProps
} from './ThreeComponentListBase';

const slickSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false
};

@withStoreValues<ThreeComponentListProps>(
    'selectedProduct',
    'product3Dsence',
    'selectedComponent',
    'selectedComponentGroup',
    'selectedObject',
    'components',
    'allComponents'
)
export class ThreeComponentListMobile extends ThreeComponentListBase {
    render() {
        const { selectedObject, components, selectedComponentGroup } = this.props;
        const selectedComponent = components.find(o => o.id === selectedObject.name);

        let filteredComponentByGroup: FurnitureComponent[];
        if (selectedComponent.componentType.isBase) {
            filteredComponentByGroup = components;
        } else {
            filteredComponentByGroup = selectedComponentGroup ?
                components.filter(o => o.componentGroup && o.componentGroup.id === selectedComponentGroup.id) :
                components;
        }

        const child = selectedObject.children[0] as THREE.Mesh;
        (child.material as THREE.MeshPhongMaterial).map.needsUpdate = true;

        const { loading, nextSelectComponent } = this.state;
        return (
            <Slider {...slickSettings}>
                {
                    filteredComponentByGroup.map((component: FurnitureComponent) => {
                        const isSelected = (selectedComponent.id === component.id);
                        const isNextSelected = nextSelectComponent && (nextSelectComponent.id === component.id);

                        return (
                            <div key={component.id}>
                                <AntdTooltip
                                    title={component.displayName}
                                >
                                    <div
                                        className={classNames(
                                            'three-component-list-component',
                                            { selected: isSelected }
                                        )}
                                    >
                                        <Img
                                            file={component.thumbnail}
                                            size="img256x256"
                                            onClick={() => this.onComponentSelect(component)}
                                        />
                                        <AccessControl allowRoles="root">
                                            {this.renderPopover(component)}
                                        </AccessControl>
                                        {(loading && isNextSelected) && (<Loading />)}
                                    </div>
                                </AntdTooltip>
                            </div>
                        );
                    })
                }
            </Slider>
        );
    }
} 