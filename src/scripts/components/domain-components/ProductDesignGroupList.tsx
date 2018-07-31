import * as React from 'react';
import styled from 'styled-components';
import { RestfulComponentRenderProps } from 'react-restful';

import { CommonStoreProps } from '@/configs';
import { ProductDesign, ProductDesignGroup } from '@/restful';
import { withStoreValues } from '@/app';
import { AntdButton } from '@/components/antd-component';

interface ProductDesignListProps extends
    CommonStoreProps,
    RestfulComponentRenderProps<ProductDesign[]> {
    readonly productDesignGroups: ProductDesignGroup[];
}

const ProductDesignGroupWrapper = styled.div`
    text-align: center;
    padding: 10px 0;
`;

const ProductDesignGroup = styled.div`
    margin-right: 15px;
    display: inline-block;
`;

@withStoreValues(
    nameof<CommonStoreProps>(o => o.selectedProductType),
    nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)
)
export class ProductDesignGroupList extends React.Component<ProductDesignListProps> {
    render() {
        const {
            productDesignGroups,
            selectedProductType,
            selectedProductDesignGroup,
            setStore
        } = this.props;

        if (!selectedProductType) {
            return null;
        }

        return (
            <ProductDesignGroupWrapper>
                <ProductDesignGroup>
                    <AntdButton
                        type={selectedProductDesignGroup ? 'default' : 'primary'}
                        onClick={() => setStore({
                            [nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)]: null
                        })}
                    >
                        Tất cả
                    </AntdButton>
                </ProductDesignGroup>

                {productDesignGroups.map(productDesignGroup => {
                    const isSelected = selectedProductDesignGroup &&
                        selectedProductDesignGroup.id === productDesignGroup.id;
                    
                    const onClick = () => setStore({
                        [nameof<CommonStoreProps>(o => o.selectedProductDesignGroup)]: productDesignGroup
                    });
                    return (
                        <ProductDesignGroup key={productDesignGroup.id}>
                            <AntdButton
                                type={isSelected ? 'primary' : 'default'}
                                onClick={onClick}
                            >
                                {productDesignGroup.name}
                            </AntdButton>
                        </ProductDesignGroup>
                    );
                })}
            </ProductDesignGroupWrapper>
        );
    }
}