import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';

import { PageLoading, PageLoadingProps } from './PageLoading';

type PageProps = React.DOMAttributes<{}>

@withStoreValues()
export class Page extends React.Component<PageProps> {
    constructor(props: any) {
        super(props);
        const { setStore } = props;
        setStore({
            [nameof<PageLoadingProps>(o => o.showPageLoading)]: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <PageLoading />
                <PageWrapper id="page" {...this.props} />
            </React.Fragment>
        )
    }
}

const PageWrapper = styled.div`
`;
