import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withStoreValues } from '@/app';
import { resfulFetcher, restfulStore, ProductDesign, productDesignResources, productDesignGroupUtils } from '@/restful';
import { ProductDesignList } from '@/components';
import { CommonStoreValues, CommonStoreProps } from '@/configs';
import { ProductDesignGroupList } from '@/components/domain-components/ProductDesignGroupList';

@withStoreValues(nameof<CommonStoreValues>(o => o.selectedProductType))
export class ProductDesignContainer extends React.Component<CommonStoreProps> {
    render() {
        const { selectedProductType } = this.props;
        if (!selectedProductType) {
            return true;
        }

        return (
            <RestfulRender
                fetcher={resfulFetcher}
                store={restfulStore}
                resource={productDesignResources.find}
                parameters={[{
                    type: 'query',
                    parameter: nameof<ProductDesign>(o => o.productType).toLowerCase(),
                    value: selectedProductType
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;
                    if (data) {
                        if (!data) {
                            return null;
                        }

                        const productDesignGroups = productDesignGroupUtils.fromDesigns(data);
                        if (!productDesignGroups.length) {
                            return null;
                        }

                        return (
                            <React.Fragment>
                                <ProductDesignGroupList productDesignGroups={productDesignGroups} />
                                <ProductDesignList data={data} />
                            </React.Fragment>
                        );
                    }
                    
                    return null;
                }}
            />
        );
    }
}