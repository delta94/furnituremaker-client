
import * as React from 'react';

import { productTypeGroupResources, restfulStore, resfulFetcher } from '@/restful';
import { ProductTypeGroupList } from '@/components';
import { RestfulRender } from 'react-restful';

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