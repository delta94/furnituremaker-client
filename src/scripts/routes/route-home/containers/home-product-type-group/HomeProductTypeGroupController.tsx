import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { ProductTypeGroup, productTypeGroupUtils } from '@/restful';

import { HomeProductTypeListStoreProps } from '../home-product-type';
import { HomeProductTypeGroupList } from './home-product-type-group-controller';

const PageHeader = styled.h1`
    text-align: center;
    margin: 0;
    background: #fff;
    padding: 30px 0 0 0;
    font-size: 24px;
    letter-spacing: -0.00133022px;
    color: #4A4A4A;
`;

interface HomeProductTypeGroupControllerProps extends CommonStoreProps {
    readonly productTypeGroups: ProductTypeGroup[];
}

@withStoreValues()
export class HomeProductTypeGroupController extends React.Component<HomeProductTypeGroupControllerProps> {
    constructor(props: HomeProductTypeGroupControllerProps) {
        super(props);
        const { productTypeGroups, setStore } = props;

        const defaulTypeGroup = productTypeGroupUtils.getDefaultProductTypeGroup(productTypeGroups);
        setStore<CommonStoreProps>({
            selectedProductTypeGroup: defaulTypeGroup,
            selectedProductType: defaulTypeGroup.productTypes[0]
        });
    }

    render() {
        const { productTypeGroups, setStore } = this.props;

        return (
            <React.Fragment>
                <PageHeader>
                    Hôm nay bạn muốn mua gì?
                </PageHeader>
                <HomeProductTypeGroupList
                    productTypeGroups={productTypeGroups}
                    onProductTypeGroupClick={(productTypeGroup) => {
                        if (productTypeGroup.productTypes.length !== 1) {
                            return;
                        }
                        const productTypeWillClick = productTypeGroup.productTypes[0];
                        setStore({
                            [nameof<CommonStoreProps>(o => o.selectedProductType)]: productTypeWillClick
                        });
                    }}
                    onProductTypeGroupHover={(productTypeGroup: ProductTypeGroup) => {
                        const onlyATypeInGroup = (productTypeGroup.productTypes.length <= 1);
                        if (onlyATypeInGroup) {
                            return;
                        }

                        setStore({
                            [nameof<CommonStoreProps>(o => o.hoveredProductTypeGroup)]: productTypeGroup,
                            [nameof<HomeProductTypeListStoreProps>(o => o.showHomeProductTypeList)]: true
                        });
                    }}
                    onProductTypeGroupLeave={() => {
                        setStore<HomeProductTypeListStoreProps>({
                            showHomeProductTypeList: false
                        });
                    }}
                />
            </React.Fragment>
        );
    }
}