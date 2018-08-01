import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';

import { CommonStoreProps } from '@/configs';
import { PageLoading, PageLoadingProps } from './PageLoading';

type PageProps = React.DOMAttributes<{}> & CommonStoreProps;

const PageContent = styled.div`
    margin: 15px 0 0 0;
`;

@withStoreValues()
export class Page extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props);
        const { setStore } = props;
        setStore({
            [nameof<PageLoadingProps>(o => o.showPageLoading)]: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <PageLoading />
                <PageContent id="page" {...this.props} />
            </React.Fragment>
        );
    }
}