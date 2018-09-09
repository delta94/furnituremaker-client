import { Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/apiEntry';
import {
    discountByQuantitiesUtils,
    DiscountByQuantity
} from '@/restful/resources/discountByQuantities';
import { FurnitureComponent } from '@/restful/resources/furnitureComponent';
import { FurnutureMaterial } from '@/restful/resources/furnutureMaterial';
import {
    ProductDiscount,
    productDiscountUtils
} from '@/restful/resources/productDiscount';
import { UploadedFile } from '@/restful/resources/uploadedFile';
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
    readonly totalPrice: number;
    readonly produceCode: string;
    readonly isFeatureProduct?: boolean;
    readonly thumbnail?: UploadedFile;
    readonly name?: string;
    readonly inventory?: number;
    readonly modulesCode?: string;
}

export interface ProductExtended extends Product {
    readonly modules: ProductModule[];
}

export const productResourceType = new ResourceType({
    name: nameof<Product>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const productResources = {
    find: new Resource<Product[]>({
        resourceType: productResourceType,
        method: 'GET',
        url: apiEntry('/product'),
        mapDataToStore: (products, resourceType, store) => {
            for (const product of products) {
                store.mapRecord(resourceType, product);
            }
        }
    }),
    findOne: new Resource<Product>({
        resourceType: productResourceType,
        method: 'GET',
        url: apiEntry('/product/:id'),
        mapDataToStore: (product, resourceType, store) => {
            store.mapRecord(resourceType, product);
        }
    }),
    count: new Resource<number>({
        resourceType: productResourceType,
        method: 'GET',
        url: apiEntry('/product/count')
    })
};

export const productUtils = {
    getTotalPriceFromModules: (productModules: ProductModule[], startValue: number) => {
        const reducer = (currentTotalPrice, currentModule) => {
            currentTotalPrice += currentModule.componentPrice + currentModule.materialPrice;
            return currentTotalPrice;
        };
        return productModules.reduce(reducer, startValue);
    },
    createModule: (component: FurnitureComponent, material: FurnutureMaterial): ProductModule => {
        return {
            component: component,
            componentPrice: component.price || 0,
            material: material,
            materialPrice: material.price || 0
        };
    },
    createDefaultProduct: (
        design: ProductDesign,
        productType: ProductType,
        furnitureComponentTypes: FurnitureComponentType[],
        materialTypes: MaterialType[]
    ): ProductExtended => {
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

        const product: ProductExtended = {
            produceCode: null,
            design,
            productType,
            modules: modules,
            totalPrice: productUtils.getTotalPriceFromModules(modules, 0)
        };
        return product;
    },
    getProductName: (product: ProductExtended) => {
        return `${product.productType.name}`;
    },
    getOriginPrice: (product: ProductExtended) => {
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
    formatPrice: (product: ProductExtended) => formatCurrency(productUtils.getOriginPrice(product)),
    getProductModulesCode: (product: ProductExtended) => {
        if (product.modulesCode) {
            return product.modulesCode;
        }

        const moduleCodes = product.modules.map(o => {
            return o.component.code + o.material.code;
        });
        return moduleCodes.join('-');
    },
    getComponentCodes: (modulesCode: string) => {
        if (!modulesCode) {
            return [];
        }

        // three chars
        const componentCodes = modulesCode.match(/\w{3}/g);
        return componentCodes.map(o => String(o));
    },
    getMaterialCodes: (modulesCode: string) => {
        if (!modulesCode) {
            return [];
        }
        // two chars after component code
        const componentCodes = modulesCode.match(/((?!\w{3})\w{2})/g);
        return componentCodes.map(o => String(o));
    },
    getDiscount: (
        product: Product,
        quantity: number,
        discountByQuantities: DiscountByQuantity[],
        productDiscount: ProductDiscount
    ) => {
        const discountByProduct =
            productDiscountUtils.getDiscountMoney(productDiscount, product);

        const discountByQuantity = discountByQuantitiesUtils.getDiscountValue(
            discountByQuantities,
            quantity
        );
        const discountPerProduct = discountByQuantity + discountByProduct;
        return discountPerProduct;
    }
};

export interface WithProductsProps {
    readonly products?: Product[];
}