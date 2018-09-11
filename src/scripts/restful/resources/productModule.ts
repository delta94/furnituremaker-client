import { FurnitureComponent } from './furnitureComponent';
import { FurnitureMaterial } from './furnutureMaterial';

export interface ProductModule {
    readonly id?: string;
    readonly component: FurnitureComponent;
    readonly componentPrice: number;
    readonly material: FurnitureMaterial;
    readonly materialPrice: number;
}

export const productModuleUtils = {
    getName: (productModule: ProductModule) => {
        return `${productModule.component.displayName || productModule.component.name} - 
            ${productModule.material.name}`;
    }
};