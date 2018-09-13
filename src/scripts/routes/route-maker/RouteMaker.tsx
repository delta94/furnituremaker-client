import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';
import {
    ProductExtended,
    productType,
    productUtils,
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
    readonly selectedModulesCode?: string;
    readonly loadedProduct?: ProductExtended;
    readonly pageReady: boolean;
}

@readyState()
@withStoreValues()
export class RouteMaker extends AppPage<RouteMakerProps, RouteMakerState> {
    static getDerivedStateFromProps(
        nextProps: RouteMakerProps,
        prevState: RouteMakerState
    ): Partial<RouteMakerState> {
        if (!nextProps.match.params.modulesCode &&
            prevState.selectedModulesCode) {
            return {
                loadedProduct: null,
                selectedModulesCode: null
            };
        }
        
        if (nextProps.match.params.modulesCode &&
            !prevState.selectedModulesCode) {
            return {
                loadedProduct: null,
                selectedModulesCode: nextProps.match.params.modulesCode
            };
        }

        if (
            (nextProps.match.params.modulesCode && prevState.selectedModulesCode) &&
            nextProps.match.params.modulesCode !== prevState.selectedModulesCode
        ) {
            return {
                ...prevState,
                pageReady: false,
                loadedProduct: null,
                selectedModulesCode: nextProps.match.params.modulesCode
            };
        }

        return null;
    }

    readonly getProduct = async (modulesCode: string): Promise<ProductExtended> => {
        const modules = await productUtils.fetchModules(modulesCode);
        const standardComponent = modules[0].component;

        const selectedComponentDesign = standardComponent.design;
        const selectedComponentType = restfulStore.findOneRecord(
            productType,
            selectedComponentDesign.productType
        );

        return {
            produceCode: modulesCode,
            design: selectedComponentDesign,
            modules: modules,
            productType: selectedComponentType,
            totalPrice: productUtils.getTotalPriceFromModules(modules, 0)
        };
    }

    readonly loadProduct = async (modulesCode: string) => {
        const { setStore } = this.props;
        const product = await this.getProduct(modulesCode);
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedProductType)]: product.productType,
            [nameof<CommonStoreProps>(o => o.selectedProductDesign)]: product.design,
            [nameof<CommonStoreProps>(o => o.selectedProduct)]: product,
            [nameof<CommonStoreProps>(o => o.drawerVisible)]: false
        });
        this.setState({
            pageReady: true,
            loadedProduct: product,
            selectedModulesCode: modulesCode
        });
    }

    constructor(props: RouteMakerProps) {
        super(props);

        const { match } = props;
        const productCode = match.params.modulesCode;
        if (productCode) {
            this.state = {
                pageReady: false,
                selectedModulesCode: productCode
            };
        } else {
            this.state = {
                pageReady: true
            };
        }
    }

    componentDidMount() {
        this.loadProductIfNeeded();
    }

    componentDidUpdate() {
        this.loadProductIfNeeded();
    }

    loadProductIfNeeded() {
        const { selectedModulesCode, loadedProduct } = this.state;
        if (selectedModulesCode && !loadedProduct) {
            this.loadProduct(selectedModulesCode);
        }
    }

    render() {
        if (!this.state.pageReady) {
            return null;
        }

        return (
            <Page>
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