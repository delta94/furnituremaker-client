import * as React from 'react';
import { ResourceParameter } from 'react-restful';
import { RouteComponentProps, RouteProps } from 'react-router';

import { PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';
import {
    FurnitureComponent,
    furnitureComponentResources,
    furnutureMaterialResouceType,
    ProductExtended,
    ProductModule,
    productType,
    productUtils,
    restfulFetcher,
    restfulStore
} from '@/restful';

import {
    ProductContainer,
    ProductDesignContainer,
    ProductTypeContainer,
    ProductTypeGroupContainer
} from './containers';
import { RouteMakerRouterProps } from './Types';

type RouteMakerProps =
    CommonStoreProps &
    RouteComponentProps<RouteMakerRouterProps> &
    PageProps;

interface RouteMakerState {
    readonly selectedProductCode?: string;
    readonly loadedProduct?: ProductExtended;
    readonly pageReady: boolean;
}

@readyState()
@withStoreValues()
export class RouteMaker extends React.Component<RouteMakerProps, RouteMakerState> {
    static getDerivedStateFromProps(
        nextProps: RouteMakerProps,
        prevState: RouteMakerState
    ): RouteMakerState {
        if (prevState.selectedProductCode !== nextProps.match.params.productCode) {
            return {
                ...prevState,
                pageReady: false,
                loadedProduct: null,
                selectedProductCode: nextProps.match.params.productCode
            };
        }

        return null;
    }

    readonly getProduct = async (productCode: string): Promise<ProductExtended> => {
        const componentCodes = productUtils.getComponentCodes(productCode);
        const fetchComponentParams = componentCodes.map((componentCode): ResourceParameter => ({
            type: 'query',
            parameter: `${nameof<FurnitureComponent>(o => o.code)}_in`,
            value: componentCode
        }));

        const materialCodes = productUtils.getMaterialCodes(productCode);

        const components = await restfulFetcher.fetchResource(
            furnitureComponentResources.find,
            fetchComponentParams
        ) as ReadonlyArray<FurnitureComponent>;

        const standardComponent = components[0];

        const selectedComponentDesign = standardComponent.design;
        const selectedComponentType = restfulStore.findOneRecord(
            productType,
            selectedComponentDesign.productType
        );

        return {
            code: productCode,
            design: selectedComponentDesign,
            modules: components.map((o, i): ProductModule => {
                const material = restfulStore.findOneRecord(
                    furnutureMaterialResouceType,
                    (materialInstance) => materialInstance.code === materialCodes[i]
                );
                return {
                    component: o,
                    componentPrice: 0,
                    material: material,
                    materialPrice: 0
                };
            }),
            productType: selectedComponentType,
            totalPrice: 0
        };
    }

    readonly loadProduct = async (productCode: string) => {
        const { setStore } = this.props;
        const product = await this.getProduct(productCode);
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedProductType)]: product.productType,
            [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: product.design,
            [nameof<CommonStoreProps>(o => o.selectedProduct)]: product,
            [nameof<CommonStoreProps>(o => o.drawerVisible)]: false
        });
        this.setState({
            pageReady: true,
            loadedProduct: product,
            selectedProductCode: productCode
        });
    }

    constructor(props: RouteMakerProps) {
        super(props);

        const { match } = props;
        const productCode = match.params.productCode;
        if (productCode) {
            this.loadProduct(productCode);
            this.state = {
                pageReady: false,
                selectedProductCode: productCode
            };
        } else {
            this.state = {
                pageReady: true
            };
        }
    }

    componentDidUpdate() {
        if (this.state.selectedProductCode && !this.state.loadedProduct) {
            this.loadProduct(this.state.selectedProductCode);
        }
    }

    componentWillUnmount() {
        const { setStore } = this.props;
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedProductType)]: null,
            [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: null,
            [nameof<CommonStoreProps>(o => o.selectedProduct)]: null
        });
    }

    render() {
        if (!this.state.pageReady) {
            return null;
        }

        const routeProps = Page.getRouteProps(this.props);
        return (
            <Page routeProps={routeProps}>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <ProductTypeGroupContainer />
                    <ProductTypeContainer />
                    <ProductDesignContainer />
                    <ProductContainer />
                </DefaultLayout>
            </Page >
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item><AntdIcon type="home" /></AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Tự thiết kế</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}