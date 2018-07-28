import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { ProductModule } from './productModule';
import { FurnitureComponentType } from './furnitureComponentType';
import { MaterialType } from './materialType';

export interface Product {
    readonly id?: string;
    readonly design: ProductDesign;
    readonly productType: ProductType;
    readonly modules: ProductModule[];
    readonly totalPrice: number;
}
 
export const productUtils = {
    getTotalPriceFromModules: (productModules: ProductModule[], startValue: number) => {
        const reducer = (currentTotalPrice, currentModule) => {
            currentTotalPrice += currentModule.componentPrice + currentModule.materialPrice;
            return currentTotalPrice;
        };
        return productModules.reduce(reducer, startValue);
    },
    getDefaultProductFromComponentTypes: (
        design: ProductDesign,
        productType: ProductType,
        furnitureComponentTypes: FurnitureComponentType[],
        materialTypes: MaterialType
    ): Product => {
        const modules: ProductModule[] = [];

        for (const furnitureComponentType of furnitureComponentTypes) {
            const defaultComponent = furnitureComponentType.furnitureComponents[0];
            modules.push({
                component: defaultComponent,
                componentPrice: defaultComponent.price,
                material: null,
                materialPrice: 0
            });
        }
        const product: Product = {
            design,
            productType,
            modules: modules,
            totalPrice: productUtils.getTotalPriceFromModules(modules, 0)
        };
        return product;
    }
};