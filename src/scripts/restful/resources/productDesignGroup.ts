import { ProductDesign } from './productDesign';

export interface ProductDesignGroup {
    readonly id?: string;
    readonly name: string;
    readonly productDesigns: ProductDesign[];
}

export const productDesignGroupUtils = {
    createDesignList: (productDesignGroup: ProductDesignGroup, listInitItems: ProductDesign[]): ProductDesignGroup => {
        return {
            ...productDesignGroup,
            productDesigns: listInitItems
        };
    },
    fromDesigns: (productDesigns: ProductDesign[]): ProductDesignGroup[] => {
        const productDesignGroups: ProductDesignGroup[] = [];

        for (const productDesign of productDesigns) {
            const productDesignGroup = productDesign.designGroup;

            const existingProductDesignGroup = productDesignGroups.find(o => o.id === productDesignGroup.id);
            if (existingProductDesignGroup) {
                existingProductDesignGroup.productDesigns.push(productDesign);
                continue;
            } else {
                const productDesingGroupWithDesigns =
                    productDesignGroupUtils.createDesignList(productDesignGroup, [productDesign]);

                productDesignGroups.push(productDesingGroupWithDesigns);
            }
        }

        return productDesignGroups;
    }
};