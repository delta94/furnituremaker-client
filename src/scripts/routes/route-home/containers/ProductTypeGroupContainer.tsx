
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { productTypeGroupResources, restfulStore, resfulFetcher } from '@/restful';
import { ProductTypeGroupList } from '@/components';

export class ProductTypeGroupContainer extends React.Component {
    render() { 
        return (
            <RestfulRender
                fetcher={resfulFetcher}
                store={restfulStore}
                resource={productTypeGroupResources.find}
                parameters={[]}
                render={(renderProps) => {
                    if (renderProps.data) {
                        return <ProductTypeGroupList productTypeGroups={renderProps.data} />;
                    }
                    return null;
                }}
            />
        );
    }
}