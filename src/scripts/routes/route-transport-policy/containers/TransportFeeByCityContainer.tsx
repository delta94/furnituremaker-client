import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { cityResources, restfulFetcher, restfulStore } from '@/restful';

import { TransportFeeByCityControl } from './transport-fee-by-city-container';

interface TransportFeeByCityProps {

}

export class TransportFeeByCity extends React.PureComponent<TransportFeeByCityProps> {
    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                parameters={[]}
                resource={cityResources.find}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (
                            <TransportFeeByCityControl
                                cities={renderProps.data}
                            />
                        );
                    }

                    return null;
                }}
            />
        );
    }
}