export interface ProductGroup {
    id: string;
    name: string;
}

export interface ProductType {
    id: string;
    name: string;
}

export interface ProductDesign {
    id: string;
    name: string;
    productType: ProductType;
    productGroup: ProductGroup;
}

export interface FurnitureComponentType {
    id: string;
    name: string;
}

export interface QuotaUnit {
    id: string;
    name: string;
}

export interface FurnutureComponent {
    id: string;
    name: string;
    obj: string;
    mtl: string;
    thumbnail: string;
    componentType: FurnitureComponentType;
    quotaValue: number;
    quotaUnit: QuotaUnit;
    designs: ProductDesign[];
    price: number;
}

export interface MaterialType {
    id: string;
    name: string;
}

export interface FurnutureMaterial {
    id: string;
    name: string;
    texture: string;
    materialType: MaterialType;
    price: string;
    inStock: boolean;
}

export interface ProductModule {
    id: string;
    component: FurnutureComponent;
    componentPrice: number;
    material: FurnutureMaterial;
    materialPrice: number;
}

export interface Product {
    id: string;
    design: ProductDesign;
    productType: ProductType;
    modules: ProductModule[];
    totalPrice: number;
}

export interface Cart {
    id: string;
    products: Product[];
    customer: Customer;
}

export interface Customer {
    id: string;
    name: string;
}