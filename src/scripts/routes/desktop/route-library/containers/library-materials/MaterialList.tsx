import List from 'antd/lib/list';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdCard, Img } from '@/components';
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
`;

const MaterialItem = styled.div`
    display: block;
    .ant-card {
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
    public render() {
        const { materials } = this.props;
        return (
            <MetarialListWrapper>
                <List
                    dataSource={materials}
                    grid={{
                        gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6,
                    }}
                    renderItem={(material: FurnitureMaterial) => {
                        return (
                            <List.Item key={material.id}>
                                <MaterialItem>
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
            </MetarialListWrapper>
        );
    }
}
