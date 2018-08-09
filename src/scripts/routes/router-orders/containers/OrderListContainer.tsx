import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { orderResources, resfulFetcher, restfulStore } from '@/restful';

export class OrderListContainer extends React.Component {
    render() {

        return (
            <RestfulRender
                fetcher={resfulFetcher}
                store={restfulStore}
                parameters={[]}
                resource={orderResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return null;
                    }
                    
                    return null;
                }}
            />
        );
    }
}