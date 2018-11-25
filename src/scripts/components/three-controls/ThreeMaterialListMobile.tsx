import './ThreeMaterialList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdTooltip } from '@/components/antd-component';
import { Img, Loading } from '@/components/domain-components';
import { FurnitureMaterial, withMaterialsByType } from '@/restful';

import {
    ThreeMaterialListBase,
    ThreeMaterialListProps
} from './ThreeMaterialListBase';

const slickSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false
};

@withStoreValues<ThreeMaterialListProps>('selectedMaterialType')
@withMaterialsByType()
@withStoreValues<ThreeMaterialListProps>(
    'selectedMaterial',
    'selectedProduct'
)
class ThreeMaterialListComponent extends ThreeMaterialListBase {
    render() {
        const { selectedMaterial, materials } = this.props;
        const { loading, nextSelectMaterial } = this.state;
        return (
            <Slider {...slickSettings}>
                {
                    materials.map((material: FurnitureMaterial) => {
                        const isSelected = (selectedMaterial.id === material.id);
                        const isNextSelected = nextSelectMaterial && (nextSelectMaterial.id === material.id);

                        return (
                            <div key={material.id}>
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
                            </div>
                        );
                    })
                }
            </Slider>
        );
    }
}

export const ThreeMaterialListMobile = withStoreValues<ThreeMaterialListProps>(
    'selectedObject',
    'selectedMaterial',
    'selectedMaterialType'
)(ThreeMaterialListComponent);