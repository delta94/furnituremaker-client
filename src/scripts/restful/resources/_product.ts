import { formatCurrency } from '@/utilities';

import { FurnitureComponentType } from './furnitureComponentType';
import { MaterialType, materialTypeUtils } from './materialType';
import { ProductDesign } from './productDesign';
import { ProductModule } from './productModule';
import { ProductType } from './productType';

export interface Product {
    readonly id?: string;
    readonly design: ProductDesign;
    readonly productType: ProductType;
    readonly modules: ProductModule[];
    readonly totalPrice: number;
    readonly code: string;
}

export const productUtils = {
    getTotalPriceFromModules: (productModules: ProductModule[], startValue: number) => {
        const reducer = (currentTotalPrice, currentModule) => {
            currentTotalPrice += currentModule.componentPrice + currentModule.materialPrice;
            return currentTotalPrice;
        };
        return productModules.reduce(reducer, startValue);
    },
    createDefaultProduct: (
        design: ProductDesign,
        productType: ProductType,
        furnitureComponentTypes: FurnitureComponentType[],
        materialTypes: MaterialType[]
    ): Product => {
        const modules: ProductModule[] = furnitureComponentTypes.map(furnitureComponentType => {
            const defaultComponent = furnitureComponentType.components[0];
            const defaultComponentMaterialType = defaultComponent.materialTypes[0];

            const defaultMaterialType = defaultComponentMaterialType &&
                materialTypes.find(o => o.id === defaultComponentMaterialType.id);

            const defaultMaterial = defaultMaterialType &&
                materialTypeUtils.getDefaultMaterial(defaultMaterialType);

            return {
                component: defaultComponent,
                componentPrice: defaultComponent.price,
                material: defaultMaterial,
                materialPrice: defaultMaterial ? defaultMaterial.price : 0
            };
        });

        const product: Product = {
            code: null,
            design,
            productType,
            modules: modules,
            totalPrice: productUtils.getTotalPriceFromModules(modules, 0)
        };
        return product;
    },
    getProductName: (product: Product) => {
        return `${product.productType.name}`;
    },
    getOriginPrice: (product: Product) => {
        if (product.totalPrice) {
            return product.totalPrice;
        }
        return product.modules.reduce(
            (currentValue, productModule: ProductModule) => {
                const { component, material } = productModule;

                return currentValue += (component.price + material.price) || 0;
            },
            0
        );
    },
    formatPrice: (product: Product) => formatCurrency(productUtils.getOriginPrice(product)),
    getProductCode: (product: Product) => {
        const moduleCodes = product.modules.map(o => {
            return o.component.code + o.material.code;
        });
        return moduleCodes.join('-');
    },
    getComponentCodes: (productCode: string) => {
        // three chars
        const componentCodes = productCode.match(/\w{3}/g);
        return componentCodes.map(o => String(o));
    },
    getMaterialCodes: (productCode: string) => {
        // two chars after component code
        const componentCodes = productCode.match(/((?!\w{3})\w{2})/g);
        return componentCodes.map(o => String(o));
    }
};