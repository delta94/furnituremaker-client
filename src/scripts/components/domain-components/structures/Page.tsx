import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

import { PageLoading } from './PageLoading';

interface PageProps extends
    React.DOMAttributes<{}>,
    Pick<CommonStoreProps, 'setStore'> {
    readonly backgound?: string;
}

const PageContent = styled.div`
    min-height: inherit;
    background-color: ${(props: Pick<PageProps, 'backgound'>) => props.backgound};
`;

@withStoreValues()
export class Page extends React.Component<PageProps> {
    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <React.Fragment>
                <PageLoading />
                <PageContent
                    id="page"
                    {...this.props}
                />
            </React.Fragment>
        );
    }
}