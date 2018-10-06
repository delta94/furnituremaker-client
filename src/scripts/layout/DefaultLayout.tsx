import * as React from 'react';
import styled from 'styled-components';

import { AntdBackTop, AntdButton, AntdLayout, Container } from '@/components';

import {
    DefaultLayoutFooter,
    DefaultLayoutHeader,
    DefaultLayoutTopbar
} from './default-layout';

const Breadcrumb = styled.div`
    margin: 20px 0;
`;

interface DefaultLayoutProps {
    readonly breadcrumb: JSX.Element;
}

export class DefaultLayout extends React.Component<DefaultLayoutProps> {
    static readonly defaultProps: Partial<DefaultLayoutProps> = {
        breadcrumb: null
    };

    render() {
        const { breadcrumb } = this.props;

        return (
            <AntdLayout
                style={{
                    minHeight: 'inherit',
                    background: '#fff'
                }}
            >
                <DefaultLayoutTopbar />
                <DefaultLayoutHeader />
                {
                    breadcrumb && (
                        <Container>
                            <Breadcrumb>
                                {breadcrumb}
                            </Breadcrumb>
                        </Container>
                    )
                }
                <AntdLayout.Content
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 30
                    }}
                >
                    {this.props.children}
                </AntdLayout.Content>
                <DefaultLayoutFooter />
                <AntdBackTop>
                    <AntdButton
                        type="primary"
                        shape="circle"
                        icon="up"
                    />
                </AntdBackTop>
            </AntdLayout>
        );
    }
}