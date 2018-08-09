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
        const productDesignGroups = productDesigns
            .reduce(productDesignGroupUtils._productDesignGroupsReducer, []);
        return productDesignGroups;
    },
    /**
     * Create designGroups from given designs
     */
    _productDesignGroupsReducer: (
        productDesignGroups: ProductDesignGroup[],
        productDesign: ProductDesign
    ): ProductDesignGroup[] => {
        const currentCheckingProductDesignGroup = productDesign.designGroup;

        const existingDesign =
            productDesignGroups.find(o => o.id === currentCheckingProductDesignGroup.id);

        if (!existingDesign) {
            const productDesingGroupWithDesign = productDesignGroupUtils
                .createDesignList(currentCheckingProductDesignGroup, [productDesign]);

            return [...productDesignGroups, productDesingGroupWithDesign];
        }

        const updatedDesignGroup = productDesignGroups.map((productDesignGroup) => {
            if (productDesignGroup === existingDesign) {
                return {
                    ...existingDesign,
                    components: [
                        ...existingDesign.productDesigns,
                        productDesign
                    ]
                };
            }
            return productDesignGroup;
        });
        return updatedDesignGroup;
    },
};