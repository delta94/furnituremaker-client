import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';

import { CommonStoreProps } from '@/configs';
import { PageLoading } from './PageLoading';

type PageProps = React.DOMAttributes<{}> & CommonStoreProps;

const PageContent = styled.div`
    min-height: inherit;
`;

@withStoreValues()
export class Page extends React.Component<PageProps> {
    render() {
        return (
            <React.Fragment>
                <PageLoading />
                <PageContent id="page" {...this.props} />
            </React.Fragment>
        );
    }
}