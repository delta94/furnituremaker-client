import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { pageResources, restfulFetcher } from '@/restful';

import { PageContent } from './page-fetcher';

interface PageFetcherProps {
    readonly slug: string;
}

export class PageFetcher extends React.PureComponent<PageFetcherProps> {
    render() {
        const { slug } = this.props;
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={pageResources.find}
                parameters={{
                    type: 'query',
                    parameter: 'slug',
                    value: slug
                }}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return <PageContent page={data[0]} />;
                }}
            />
        );
    }
}