import './ThreeMaterialList.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStoreValues } from '@/app';
import { AntdList, AntdTabs, AntdTooltip } from '@/components/antd-component';
import { Img, Loading } from '@/components/domain-components';
import { FurnitureMaterial, withMaterialsByType } from '@/restful';

import {
    ThreeMaterialListBase,
    ThreeMaterialListProps
} from './ThreeMaterialListBase';

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
}

export const ThreeMaterialList = withStoreValues<ThreeMaterialListProps>(
    'selectedObject',
    'selectedMaterial',
    'selectedMaterialType'
)(ThreeMaterialListComponent);