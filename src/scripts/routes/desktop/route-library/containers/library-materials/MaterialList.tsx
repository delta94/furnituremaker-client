import List from 'antd/lib/list';
import { number } from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import {
    AntdCard,
    AntdCol,
    AntdRow,
    Container,
    FullScreenModal,
    Img
} from '@/components';
import { CommonStoreProps } from '@/configs';
import {
    FurnitureMaterial,
    WithMaterialProps,
    withMaterialsByType
} from '@/restful';
import { formatCurrency } from '@/utilities';

const MetarialListWrapper = styled.div`
    display: flex;
    .ant-select {
        min-width: 200px;
    }
    .ant-list {
        width: 100%;
    }
    .material-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-header {
            text-transform: uppercase;
        }
        &-spec {
            color: gray;
            font-size: 13px;
        }
        &-description {
            color: black;
        }
    }
`;

const MaterialItem = styled.div`
    display: block;
    .ant-card {
        cursor: pointer;
        &-body {
            padding: 16px 8px;
        }
    }
    img {
        max-width: 100%;
        min-width: 100%;
    }
    .description {
        margin-bottom: 0;
    }
`;

export interface MetarialListProps extends WithMaterialProps {
    readonly onSelect: () => void;
}

@withStoreValues<CommonStoreProps>('selectedMaterialType')
@withMaterialsByType()
export class MetarialList extends React.PureComponent<MetarialListProps> {
    readonly state: {
        readonly selectedMaterial?: FurnitureMaterial
    } = {};

    public render() {
        const { materials } = this.props;
        const { selectedMaterial } = this.state;
        const filteredMaterials = materials.filter(o => !o.hideInLibrary);

        return (
            <MetarialListWrapper>
                <List
                    dataSource={filteredMaterials}
                    grid={{
                        gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6,
                    }}
                    renderItem={(material: FurnitureMaterial) => {
                        return (
                            <List.Item key={material.id}>
                                <MaterialItem onClick={() => this.setState({ selectedMaterial: material })}>
                                    <AntdCard
                                        cover={<Img file={material.texture} />}
                                    >
                                        <AntdCard.Meta
                                            title={material.displayName || material.name}
                                            description={(
                                                <p className="description">
                                                    Loại: {material.materialType.name}
                                                    <br />
                                                    Giá: {formatCurrency(material.price)}
                                                </p>
                                            )}
                                        />
                                    </AntdCard>
                                </MaterialItem>
                            </List.Item>
                        );
                    }}
                />
                {
                    selectedMaterial && (
                        <FullScreenModal
                            visibled={true}
                            onClose={() => this.setState({ selectedMaterial: null })}
                        >
                            <Container>
                                <AntdRow type="flex" gutter={30}>
                                    <AntdCol span={8}>
                                        <div>
                                            <Img className="mw-100 w-100" file={selectedMaterial.texture} />
                                        </div>
                                    </AntdCol>
                                    <AntdCol span={12}>
                                        <div className="material-info">
                                            <h2 className="material-info-header">
                                                {selectedMaterial.displayName || selectedMaterial.name}
                                            </h2>
                                            <p className="material-info-spec">
                                                Loại: {selectedMaterial.materialType.name}
                                                <br />
                                                Giá: {formatCurrency(selectedMaterial.price)}
                                            </p>
                                            <p className="material-info-description">
                                                {selectedMaterial.description || 'Không có mô tả'}
                                            </p>
                                        </div>
                                    </AntdCol>
                                </AntdRow>
                            </Container>
                        </FullScreenModal>
                    )
                }
            </MetarialListWrapper>
        );
    }
}
