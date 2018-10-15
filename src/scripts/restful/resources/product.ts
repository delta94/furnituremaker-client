import { RequestParameter, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulFetcher, restfulStore } from '@/restful/environment';
import { formatCurrency } from '@/utilities';

import {
    discountByQuantitiesUtils,
    DiscountByQuantity
} from './discountByQuantities';
import {
    FurnitureComponent,
    furnitureComponentResources
} from './furnitureComponent';
import { FurnitureComponentType } from './furnitureComponentType';
import {
    FurnitureMaterial,
    furnitureMaterialResources
} from './furnutureMaterial';
import { MaterialType, materialTypeUtils } from './materialType';
import { ProductDesign } from './productDesign';
import { ProductDiscount, productDiscountUtils } from './productDiscount';
import { ProductModule } from './productModule';
import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

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
    readonly photos?: UploadedFile[];
}

export interface ProductExtended extends Product {
    readonly modules: ProductModule[];
}

export const productResourceType = new ResourceType<Product>({
    store: restfulStore,
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
        url: apiEntry('/product')
    }),
    findOne: new Resource<Product>({
        resourceType: productResourceType,
        method: 'GET',
        url: apiEntry('/product/:id')
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
    createModule: (component: FurnitureComponent, material: FurnitureMaterial): ProductModule => {
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
    },
    fetchModules: async (modulesCode: string) => {
        const componentCodes = productUtils.getComponentCodes(modulesCode);
        const materialCodes = productUtils.getMaterialCodes(modulesCode);

        const componentParamsFetchList = componentCodes.map((code): RequestParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureComponent>(o => o.code),
                value: code
            };
        });

        const materialParamsFetchList = materialCodes.map((code): RequestParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureMaterial>(o => o.code),
                value: code
            };
        });

        const componentsMaterials = await Promise.all([
            Promise.all<FurnitureComponent[]>(componentParamsFetchList.map((param) =>
                restfulFetcher.fetchResource(
                    furnitureComponentResources.find,
                    [param]
                )
            )),
            Promise.all<FurnitureMaterial[]>(materialParamsFetchList.map((param) =>
                restfulFetcher.fetchResource(
                    furnitureMaterialResources.find,
                    [param]
                )
            ))
        ]);

        const componentList = componentsMaterials[0];
        const materialList = componentsMaterials[1];

        const modules = componentList.map((component, index) =>
            productUtils.createModule(component[0], materialList[index][0])
        );

        return modules;
    }
};

export interface WithProductsProps {
    readonly products?: Product[];
}