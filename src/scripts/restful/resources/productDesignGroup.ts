import { ProductDesign } from './productDesign';

export interface ProductDesignGroup {
    id?: string;
    name: string;
    productDesigns: ProductDesign[];
}

export const productDesignGroupUtils = {
    fromDesigns: (productDesigns: ProductDesign[]): ProductDesignGroup[] => {
        const productDesignGroups: ProductDesignGroup[] = [];

        for (const productDesign of productDesigns) {
            const productDesignGroup = productDesign.designGroup;

            const existingProductDesignGroup = productDesignGroups.find(o => o.id === productDesignGroup.id);
            if (existingProductDesignGroup) {
                if (!existingProductDesignGroup.productDesigns) {
                    existingProductDesignGroup.productDesigns = [];
                }
                existingProductDesignGroup.productDesigns.push(productDesign);
                continue;
            } else {
                productDesignGroup.productDesigns = [];
                productDesignGroup.productDesigns.push(productDesign);
                productDesignGroups.push(productDesignGroup);
            }
        }

        return productDesignGroups;
    }
};