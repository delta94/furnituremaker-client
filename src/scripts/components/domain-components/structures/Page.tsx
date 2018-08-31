import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

import { PageLoading } from './PageLoading';

type PageProps = React.DOMAttributes<{}> & CommonStoreProps & {
    readonly routeProps: RouteComponentProps<{}>;
};

const PageContent = styled.div`
    min-height: inherit;
`;

@withStoreValues()
export class Page extends React.Component<PageProps> {
    static readonly getRouteProps =
        <T, P extends RouteComponentProps<T>>(props: P): RouteComponentProps<T> => ({
            history: props.history,
            location: props.location,
            match: props.match,
            staticContext: props.staticContext
        })

    readonly getCurrentRouteProps = () => this.props.routeProps;

    constructor(props: PageProps) {
        super(props);
        this.props.setStore({
            [nameof<CommonStoreProps>(o => o.getCurrentRouteProps)]: this.getCurrentRouteProps
        });
    }

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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