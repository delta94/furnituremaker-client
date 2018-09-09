import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

import { PageLoading } from './PageLoading';

type PageProps =
    React.DOMAttributes<{}> &
    Pick<CommonStoreProps, 'setStore'> &
    {
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

    readonly resetAppState = () => {
        this.props.setStore<CommonStoreProps>({
            selectedComponent: null,
            selectedMaterialType: null,
            selectedProduct: null,
            selectedProductDesign: null,
            selectedProductDesignGroup: null,
            selectedProductType: null,
            selectedProductTypeGroup: null,
            selectedPromotion: null
        });
    }

    constructor(props: PageProps) {
        super(props);
        this.resetAppState();
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