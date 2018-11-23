import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import {
    ProductExtended,
    productType,
    productUtils,
    restfulStore
} from '@/restful';

import { RouteMakerBaseRouterProps } from './Types';

type RouteMakerBaseProps =
    CommonStoreProps &
    RouteComponentProps<RouteMakerBaseRouterProps> &
    PageProps;

interface RouteMakerBaseState {
    readonly selectedModulesCode?: string;
    readonly loadedProduct?: ProductExtended;
    readonly pageReady: boolean;
}

export class RouteMakerBase extends AppPage<RouteMakerBaseProps, RouteMakerBaseState> {
    static getDerivedStateFromProps(
        nextProps: RouteMakerBaseProps,
        prevState: RouteMakerBaseState
    ): Partial<RouteMakerBaseState> {
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

    constructor(props: RouteMakerBaseProps) {
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
}